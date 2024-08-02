import MailIcon from "../../../../assets/icons/MailIcon"
import Pen from "../../../../assets/icons/Pen"
import PhoneIcon from "../../../../assets/icons/PhoneIcon"
import TrashCan from "../../../../assets/icons/TrashCan"
import Button from "../../../../Components/Button"

type Props = {}

function Overview({}: Props) {
  return (
    <div className="grid grid-cols-12 gap-4">
    <div className="col-span-8">
        <div className="bg-[#F3F3F3] rounded-lg h-[108px] w-full p-4 space-y-5">
            <div className="flex items-center gap-2">
            <p className="w-8 bg-[url('https://s3-alpha-sig.figma.com/img/b0b0/fef6/46944393f2dbab75baf0521d6db03606?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JKaYgp-3a-l3Mf9djW8iztMnXKkdU5qi-Vzu1r6EF~4m9a4sKcenmPbkWEgYfuvH83yiC1c0-8cOgq3p228EXebKTMMi8T4gFgA64-5HSFVl8tSi0oe~74-p09C~xEfm8RAKoLvqiyOoLjutLIvjkzFbMY7tIaVI5ktUcNxMS3dUTAQy2SFmp96jLZhGyifx8DpEvxFy58Z~orck26rD8tVRYl5z4sg6XSgJ~c-C5mQqLRV6TybKP79Ir8PrD~PNZQjt75zlVN9PN2TfMAY96syGUde0ChnsL~6R5hWhaFIQwIrXogU2HcpUiF-J5YVJnLXRRRGbSCRSJTtl4dGJXA__')] bg-cover h-8 rounded-full"></p>
            <p className="pr-3 border-r-[1px] font-bold text-[16px] border-borderRight">John Doe</p>
            <p className="font-bold text-[16px] ps-2">ElectroTech Solution</p>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex items-center">
                <p className="text-[14px] flex items-center gap-1 pr-3 border-r-[1px] border-borderRight"><MailIcon size={16} color="#565148"/>   electrotech@gmail.com</p>
                <p className="text-[14px] ps-3  flex items-center gap-1"><PhoneIcon color="#565148" size={16}/> 9654559072</p>
              </div>
              <div className="flex gap-3 items-center">
              <Button  variant="secondary" className="h-[26px] w-[68px] text-[12px]  items-center justify-center" ><Pen size={14} color="#565148" /> <p className="text-sm font-medium">Edit</p></Button>
              <Button variant="secondary" className="h-[26px] w-[88px] text-[12px] items-center justify-center" ><TrashCan size={15} color="#565148"/> <p className="text-sm font-medium">Delete</p></Button>
              </div>
            </div>
        </div>
    </div>
    <div className="col-span-4 border">ew3ef</div>
    </div>
  )
}

export default Overview