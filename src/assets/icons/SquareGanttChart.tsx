

type Props = {
color?:string
size?:number
}

function SquareGanttChart({size,color}: Props) {
  return (
    <svg width= {size||"12"} height={size||"12"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 8H16M8 12H14M11 16H16M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke={color||'white'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  )
}

export default SquareGanttChart