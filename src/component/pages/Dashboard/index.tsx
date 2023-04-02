
import Base from '../../layouts/base'
export default function Dashboard() {
   const click = async () => {
    console.log('test')
  }
  return (
    <Base>
      
      <button onClick={click}>test</button>
    </Base>
  )
}