import './h1Title.scss'

interface H1Title {
  children: string;
}

export default function H1Title({children}:H1Title) {
  return (
    <h1 className="h1title">
      {children}
      <div className="underline"></div>
    </h1>
  )
}