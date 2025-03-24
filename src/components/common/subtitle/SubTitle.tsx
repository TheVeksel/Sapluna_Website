import './SubTitle.scss'
interface Subtitle {
  children: string;
}
export default function SubTitle({children}:Subtitle) {
  return (
    <h2 className="subTitle">{children}</h2>
  )
}