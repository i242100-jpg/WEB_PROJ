'use client';
import {useEffect, useState, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {createPlayer, readPlayer, readPlayers, renamePlayer, selectPlayer, type Player} from '@/app/quizzes/player';
export interface PlayerFormProps { minimum?: number }
export default function PlayerForm({minimum=2}:PlayerFormProps) {
  const [name,setName]=useState(''); const [error,setError]=useState('');
  const [players,setPlayers]=useState<Player[]>([]); const [active,setActive]=useState<Player|null>(null);
  const router=useRouter();
  const [newName,setNewName]=useState('');
  const [renameError,setRenameError]=useState('');
  const [notice,setNotice]=useState('');
  useEffect(() => {
    function refresh() {
      setPlayers(readPlayers());
      setActive(readPlayer());
    }
    const frame = window.requestAnimationFrame(refresh);
    window.addEventListener('storage', refresh);
    window.addEventListener('pageshow', refresh);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('storage', refresh);
      window.removeEventListener('pageshow', refresh);
    };
  }, []);
  function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); const clean=name.trim();
    if(clean.length<minimum||clean.length>40){setError(`Enter a name between ${minimum} and 40 characters.`);return;}
    if(readPlayers().some(p=>p.name.toLowerCase()===clean.toLowerCase())){setError('This name already exists. Select your saved profile below.');return;}
    try{createPlayer(clean);router.push('/scores');}catch{setError('Browser storage is unavailable. Enable it to save your profile.');}
  }
  function choose(id:string){try{selectPlayer(id);router.push('/scores');}catch{setError('Could not open this profile.');}}
  function rename(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setRenameError(''); setNotice('');
    if(!active)return;
    if(readPlayer()?.id!==active.id){setRenameError('The active profile changed. Select your profile again.');return;}
    try{
      const updated=renamePlayer(active.id,newName);
      setActive(updated);setPlayers(readPlayers());setNewName('');
      setNotice('Profile renamed. Your saved scores are unchanged.');
    }catch(err){setRenameError(err instanceof Error?err.message:'Could not rename your profile.');}
  }
  return <div className="space-y-6">{active&&<p>Current explorer: <strong>{active.name}</strong></p>}
    <form noValidate onSubmit={submit} className="space-y-4"><label className="block">Explorer name<input className="atlas-input" value={name} onChange={e=>{setName(e.target.value);setError('')}} aria-invalid={!!error} aria-describedby="profile-error" maxLength={40}/></label>
      {error&&<p id="profile-error" role="alert" className="text-red-200">{error}</p>}
      <button className="primary" type="submit">Create profile</button></form>
    {active&&<form noValidate onSubmit={rename} className="space-y-4">
      <h2 className="text-xl">Rename current explorer</h2>
      <label className="block" htmlFor="rename-explorer">New explorer name</label>
      <input id="rename-explorer" className="atlas-input" value={newName} placeholder={active.name} maxLength={40} onChange={e=>{setNewName(e.target.value);setRenameError('');setNotice('')}} aria-invalid={!!renameError} aria-describedby={renameError?'rename-error':undefined}/>
      {renameError&&<p id="rename-error" role="alert" className="text-red-200">{renameError}</p>}
      <button className="primary" type="submit">Save name</button>
      {notice&&<p role="status">{notice}</p>}
    </form>}
    {players.length>0&&<section className="space-y-2"><h2 className="text-xl">Saved profiles</h2>{players.map(p=><button key={p.id} className="back block w-full text-left" onClick={()=>choose(p.id)}>{p.name}{active?.id===p.id?' · Current profile':''} →</button>)}</section>}
    <p>Profiles and scores are saved on this browser only. This is not a login system.</p></div>;
}
