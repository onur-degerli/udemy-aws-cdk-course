import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login('onurdegerli', 'nM58AdtgRa7RGN8)');
  const idToken = await service.getIdToken();
  console.log(idToken);
}

testAuth();