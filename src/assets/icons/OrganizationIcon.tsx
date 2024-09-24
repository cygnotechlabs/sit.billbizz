import organizationIcon from '../Images/Ellipse 1.png'
type Props = {};

const OrganizationIcon = ({}: Props) => {
  return (
    <div>
      <img
        src={organizationIcon}
        alt=""
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default OrganizationIcon;
