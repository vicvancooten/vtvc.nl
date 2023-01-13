import Image from "next/image";
import me from "./Me.jpg";

export default function Me() {
  return <Image src={me} alt="Vic van Cooten" className="me" />;
}
