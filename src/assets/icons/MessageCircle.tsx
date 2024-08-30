
type Props = {
    size:number,
    color:string
}

function MessageCircle({size,color}: Props) {
  return (
    <>
    <svg width={size || "24"} height={size || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9 20C9.80858 20.979 12.0041 21.2442 14.0909 20.7478C16.1777 20.2513 18.0186 19.0258 19.2818 17.2922C20.545 15.5585 21.1474 13.4307 20.9806 11.2921C20.8137 9.1536 19.8886 7.14496 18.3718 5.62818C16.855 4.1114 14.8464 3.18624 12.7078 3.0194C10.5693 2.85257 8.44147 3.45503 6.70782 4.71823C4.97417 5.98143 3.74869 7.8223 3.25222 9.9091C2.75575 11.9959 3.02094 14.1914 4 16.1L2 22L7.9 20Z" stroke={color} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </>
  )
}

export default MessageCircle