import { ActivityIcon, BookOpenIcon, ChevronRightIcon } from '../components/Icons'

const DIMENSIONS = [
  {
    title: '1. Quantità',
    text: 'La quantità di carboidrati disponibili della porzione è il primo fattore: raddoppiare la porzione raddoppia il carico glicemico.',
  },
  {
    title: '2. Velocità',
    text: 'L’indice glicemico misura la velocità di salita a parità di carboidrati. Non descrive, da solo, l’impatto reale della porzione.',
  },
  {
    title: '3. Equilibrio',
    text: 'Fibre, proteine e grassi sono letti insieme ai carboidrati: possono rendere la salita più graduale, ma non cancellano la quantità.',
  },
  {
    title: '4. Preparazione',
    text: 'La preparazione conta: cottura lunga e consistenza frullata possono accelerare; al dente, raffreddamento e acidità possono rallentare.',
  },
] as const

export default function ExplanationScreen() {
  return (
    <div>
      <section className="mb-6 px-1">
        <p className="screen-kicker">Metodo GLICOGIG</p>
        <h1 className="screen-title">Come leggiamo <span className="text-brand">un piatto.</span></h1>
        <p className="screen-subtitle">Quattro dimensioni verificabili, un calcolo locale e limiti mostrati apertamente. Il verdetto nasce dal carico complessivo, non dall’IG da solo.</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {DIMENSIONS.map(({ title, text }) => <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card" key={title}><p className="section-label">Dimensione</p><h2 className="mt-1 text-xl font-extrabold text-ink">{title}</h2><p className="mt-3 text-sm leading-7 text-muted">{text}</p></article>)}
      </section>

      <section className="mt-5 app-card rounded-3xl border border-brand/30 bg-brand-soft/35 p-5 shadow-card sm:p-7">
        <div className="flex items-start gap-3"><ActivityIcon className="mt-1 size-7 shrink-0 text-brand" /><div><p className="section-label text-brand">Formula verificata</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Dal singolo ingrediente al piatto</h2></div></div>
        <div className="mt-5 rounded-2xl border border-brand/20 bg-paper p-4 font-mono text-sm font-bold text-brand sm:text-base">CG = IG × carboidrati disponibili della porzione ÷ 100</div>
        <p className="mt-4 text-sm leading-7 text-muted">Il carico glicemico del piatto è la somma dei contributi degli ingredienti risolti. Sotto 5 g di carboidrati la fascia è trascurabile; altrimenti il valore base è basso fino a CG 10, medio fino a 19 e alto da 20. Le regole verificate possono alzare la fascia per profili rapidi o liquidi.</p>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-line bg-surface p-5"><p className="section-label">Da dove arrivano i numeri</p><ul className="mt-3 space-y-3 text-sm leading-6 text-muted"><li>• Catalogo e ricette usano esclusivamente i dataset embedded verificati.</li><li>• La foto risolve gli ingredienti contro lo stesso catalogo locale.</li><li>• L’etichetta usa i macro dichiarati da Open Food Facts tramite proxy same-origin; IG e CG compaiono solo con un match locale univoco.</li><li>• Nei risultati e nel Pasto, i valori mancanti restano n.d. e non vengono sostituiti con dati nutrizionali esterni.</li></ul></article>
        <article className="rounded-3xl border border-line bg-surface p-5"><p className="section-label">Cosa non misura</p><p className="mt-3 text-sm leading-7 text-muted">La stima descrive il cibo e la porzione, non la risposta personale. Foto, condimenti non visibili, preparazione reale e differenze individuali possono cambiare il risultato.</p><a className="secondary-button mt-4" href="#learn">Apri Impara <BookOpenIcon className="size-5" /><ChevronRightIcon className="size-4" /></a></article>
      </section>

      <p className="mt-6 rounded-2xl border border-line bg-paper p-4 text-xs leading-5 text-muted">Informazioni alimentari ed educative: non sostituiscono diagnosi, terapia o indicazioni personalizzate di professionisti sanitari.</p>
    </div>
  )
}
