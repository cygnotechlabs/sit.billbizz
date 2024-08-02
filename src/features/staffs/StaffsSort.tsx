import Button from '../../Components/Button'
import ListIcon from '../../assets/icons/ListIcon'

type Props = {}

function StaffsSort({}: Props) {
  return (
    <div>
        <Button  variant="secondary"  size="sm">
        <ListIcon color="#565148" /> <p className="text-sm font-medium text-outlineButton">Sort By</p></Button>
    </div>
  )
}

export default StaffsSort