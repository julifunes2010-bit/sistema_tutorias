```vue
<template>
  <div class="register-container">

    <div class="register-box">

      <h1>Crear cuenta</h1>

      <p>Registrate con tu correo institucional</p>

      <form @submit.prevent="registrarse">

        <!-- CORREO -->
        <label for="email">
          Correo institucional
        </label>

        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="ejemplo@escuelasproa.edu.ar"
          required
        />

        <p
          v-if="email && !esCorreoInstitucional"
          class="error"
        >
          Debes utilizar un correo institucional.
        </p>


        <!-- CONTRASEÑA -->
        <label for="password">
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Ingresá tu contraseña"
          required
        />


        <!-- CONFIRMAR CONTRASEÑA -->
        <label for="confirmPassword">
          Confirmar contraseña
        </label>

        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="Repetí tu contraseña"
          required
        />
        <!-- ROL --> 
        <label for="rol">
          Seleccioná tu rol 
        </label>
        <select id="rol" v-model="rol" required >

          
        <!-- ROL -->
        <label for="rol">
          Seleccioná tu rol
        </label>

            <option value="director"> 
              Director 
            </option>

            <option value="preceptor"> 
              Preceptor
             </option>

            <option value="coordinador">
              Coordinador 
            </option> 

            <option value="secretario">
              Secretario 
            </option> 

            <option value="profesor"> 
              Profesor 
            </option>

        </select>
>>>>>>> registers

        <select id="rol" v-model="rol" required>

          <option value="director">
            Director
          </option>

          <option value="preceptor">
            Preceptor
          </option>
          <option value="coordinador">
             Coordinador 
          </option> 
          <option value="secretario">
             Secretario 
          </option>
          <option value="profesor"> 
            Profesor 
          </option>
     </select>
        <!-- ERROR -->

        <p v-if="error" class="error">
          {{ error }}
        </p>


        <!-- REGISTRARSE -->
        <button type="submit">
          Registrarse
        </button>

      </form>


      <!-- VOLVER AL LOGIN -->
      <div class="login-link">

        <p>
          ¿Ya tenés una cuenta?
        </p>

      <!--/ = link -->
        <router-link to="/">
          Iniciar sesión
        </router-link>

      </div>

    </div>

  </div>
</template>


<script >

import { ref, computed } from "vue";
import { useRouter } from "vue-router";


// Router
const router = useRouter();

// Datos del formulario
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const error = ref("");


// Verificar correo institucional
const esCorreoInstitucional = computed(() => {

  const regex =
    /^[a-zA-Z0-9._%+-]+@escuelasproa\.edu\.ar$/;

  return regex.test(email.value);

});


// Ir al Login
  const iralogin = () => {
  router.push("/login");

};


// Registrar usuario
const registrarse = () => {

  error.value = "";


  // Verificar correo institucional
  if (!esCorreoInstitucional.value) {

    error.value =
      "El correo ingresado no es institucional.";

    return;
  }


  // Verificar contraseña
  if (password.value !== confirmPassword.value) {

    error.value =
      "Las contraseñas no coinciden.";

    return;
  }


  // Registro correcto
  console.log("Correo:", email.value);
  console.log("Contraseña:", password.value);

  alert("Cuenta creada correctamente");


  // Volver al Login
  router.push("/login");

};

</script>


<style scoped>

.register-container {
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #f4f6f8;
}


.register-box {
  width: 400px;

  padding: 35px;

  background: white;

  border-radius: 12px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.15);
}


h1 {

  color : #333;

  text-align: center;
  color: #110e0e;
  margin-bottom: 10px;
}


.register-box > p {
  text-align: center;

  color: #110e0e;

  margin-bottom: 25px;
}


form {
  display: flex;

  flex-direction: column;
}


label {

  color: #333;
  
  margin-top: 15px;

  margin-bottom: 6px;

  font-weight: bold;

  
}


input {
  padding: 12px;

  border: 1px solid #3ca2dd;

  border-radius: 6px;

  font-size: 15px;
}


input:focus {
  outline: none;

  border-color: #42b883;
}


button {
  margin-top: 20px;

  padding: 12px;

  border: none;

  border-radius: 6px;

  background: #42b883;

  color: white;

  font-size: 16px;

  cursor: pointer;
}


button:hover {
  background: #369f6e;
}


.error {
  color: #d93025;

  font-size: 14px;

  margin: 8px 0 0;
}


.login-link {
  margin-top: 20px;

  text-align: center;
}


.login-link p {
  color: #666;
}


.back-button {
  width: 100%;

  background: transparent;

  color: #42b883;

  border: 1px solid #42b883;
}


.back-button:hover {
  background: #42b883;

  color: white;
}

</style>
```
