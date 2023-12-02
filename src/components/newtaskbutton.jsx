
import { Link} from "react-router-dom";


function newtaskbutton() {

  return (
    <div className="mt-[4%] mr-[20%] ml-[97%] fixed h-auto w-[5%]">
    <Link to="/add-task">
      <img src="\src\img\+.png" className="h-auto w-[98%]" />
    </Link>
  </div>
  );
}

export default newtaskbutton;
