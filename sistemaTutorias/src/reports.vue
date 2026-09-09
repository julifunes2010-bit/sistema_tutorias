<template>
  <div class="reports-page">
    <RoleSidebar />

    <main class="reports-content">
      <div class="page-header">
        <h1>REPORTES</h1>
        <p>Consultá información o comunicate con nosotros.</p>
      </div>

      <div class="profile">
        <div class="profile-image">
          <div class="profile-head"></div>
          <div class="profile-body"></div>
        </div>
        <span class="profile-name">LUIS</span>
      </div>

      <section class="report-card">
        <div class="report-icon">?</div>
        <div class="report-info">
          <h2>¿Tenés alguna consulta?</h2>
          <p>Cualquier consulta, duda o pregunta comunicate con nosotros.</p>
        </div>
        <button class="contact-button" @click="contactar">Contactanos</button>
      </section>

      <section class="information-card">
        <h2>Información</h2>
        <p>
          Si encontraste un problema en el sistema, necesitás realizar una consulta
          o querés informar alguna situación, podés comunicarte con nosotros a través
          de los medios de contacto.
        </p>
      </section>

      <footer class="footer">
        <p class="contact-title">Comunicate con nosotros</p>
        <div class="contact-info">
          <span>🟢 +54 9 3548 32-0643</span>
          <span>✉️ jfqmw@esc.edu.ar</span>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import RoleSidebar from './components/RoleSidebar.vue'

function contactar() {
  alert('Podés comunicarte con nosotros mediante WhatsApp o correo electrónico.')
}
</script>

<style scoped>
* { box-sizing: border-box; }
.reports-page { min-height: 100vh; width: 100%; display: flex; background: #f4f7f9; font-family: Arial, Helvetica, sans-serif; color: #333; }
.reports-content { flex: 1; min-height: 100vh; margin-left: 250px; padding: 45px 50px 0; display: flex; flex-direction: column; max-width: 1350px; }
.page-header { margin-bottom: 25px; }
.page-header h1 { margin: 0 0 8px; font-size: 32px; font-weight: 500; letter-spacing: 2px; color: #333; }
.page-header p { margin: 0; font-size: 14px; color: #888; }
.profile { display: flex; align-items: center; gap: 15px; margin-bottom: 30px; }
.profile-image { width: 75px; height: 75px; border: 1px solid #cfcfcf; border-radius: 50%; position: relative; overflow: hidden; background: #fafafa; }
.profile-head { width: 27px; height: 27px; background: #8c8c8c; border-radius: 50%; position: absolute; top: 13px; left: 23px; }
.profile-body { width: 60px; height: 31px; background: #8c8c8c; border-radius: 50% 50% 0 0; position: absolute; bottom: -4px; left: 7px; }
.profile-name { font-size: 15px; color: #777; letter-spacing: 1px; }
.report-card, .information-card { width: 100%; background: #fff; border: 1px solid #e1e1e1; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,.04); }
.report-card { padding: 30px; display: flex; align-items: center; gap: 25px; }
.report-icon { width: 55px; height: 55px; min-width: 55px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #e8eef7; color: #5159d8; font-size: 25px; font-weight: bold; }
.report-info { flex: 1; }
.report-info h2 { margin: 0 0 8px; font-size: 18px; font-weight: 500; }
.report-info p { margin: 0; font-size: 14px; line-height: 1.5; color: #888; }
.contact-button { padding: 10px 18px; border: 1px solid #5159d8; border-radius: 7px; background: white; color: #5159d8; font-size: 13px; cursor: pointer; }
.contact-button:hover { background: #5159d8; color: white; }
.information-card { margin-top: 20px; padding: 25px 30px; }
.information-card h2 { margin: 0 0 10px; font-size: 17px; font-weight: 500; }
.information-card p { margin: 0; max-width: 700px; font-size: 14px; line-height: 1.6; color: #888; }
.footer { margin-top: auto; border-top: 1px solid #dcdcdc; padding: 25px 0 20px; text-align: center; }
.contact-title { margin: 0 0 18px; color: #777; font-size: 15px; }
.contact-info { display: flex; justify-content: center; align-items: center; gap: 40px; color: #888; font-size: 13px; }
@media (max-width: 900px) { .reports-content { margin-left: 70px; padding: 30px 25px 0; } }
@media (max-width: 600px) { .reports-content { margin-left: 0; padding: 25px 15px 0; } .report-card { flex-direction: column; align-items: flex-start; padding: 22px; } .contact-button { width: 100%; } .contact-info { flex-direction: column; gap: 10px; } }
</style>
