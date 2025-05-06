import { Container } from "../styled/RegistrationStyle";
import RegistrationForm from "../Components/Auth/components/Registration/Form";

export default function Register() {
  return (
    <Container
      style={{
        backgroundImage: "url(/pics/image1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <RegistrationForm />
    </Container>
  );
}
