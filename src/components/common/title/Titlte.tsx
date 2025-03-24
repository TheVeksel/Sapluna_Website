import './Title.scss'

interface H1Title {
  children: string;
}

export default function Title({children}:H1Title) {
  return (
    <h1 className="title">
      {children}
      <div className="underline"></div>
    </h1>
  )
}