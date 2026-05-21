<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  cnpj: '',
  senha: '',
});

const errors = reactive({
  cnpj: '',
  senha: '',
});

const isLoading = ref(false);

const maskCNPJ = (val: string) => {
  return val
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .substring(0, 18);
};

const validateCNPJ = (cnpj: string) => {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  return cleanCNPJ.length === 14;
};

const handleLogin = async () => {
  errors.cnpj = '';
  errors.senha = '';

  if (!validateCNPJ(form.cnpj)) {
    errors.cnpj = 'CNPJ inválido. Deve conter 14 dígitos.';
    return;
  }

  if (form.senha.length < 6) {
    errors.senha = 'A senha deve ter pelo menos 6 caracteres.';
    return;
  }

  try {
    isLoading.value = true;
    const success = await auth.login(form.cnpj.replace(/\D/g, ''), form.senha);
    if (success) {
      router.push('/dashboard');
    }
  } catch (err: any) {
    errors.senha = 'Credenciais inválidas ou erro no servidor.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <header class="login-header">
        <h1 class="title">Cesta<span>Mais</span></h1>
        <p class="subtitle">Painel do Supermercado</p>
      </header>

      <form @submit.prevent="handleLogin" class="login-form">
        <BaseInput
          v-model="form.cnpj"
          label="CNPJ"
          placeholder="00.000.000/0000-00"
          :mask="maskCNPJ"
          :error="errors.cnpj"
        />
        <BaseInput
          v-model="form.senha"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          :error="errors.senha"
        />
        
        <BaseButton type="submit" :loading="isLoading" class="submit-btn">
          Entrar no Painel
        </BaseButton>
      </form>

      <footer class="login-footer">
        <p>Esqueceu sua senha? Entre em contato com o suporte.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--bg) 0%, #eff6ff 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  shadow: var(--shadow-md);
  border: 1px solid var(--border);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.025em;
}

.title span {
  color: var(--primary);
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-top: var(--space-1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.submit-btn {
  width: 100%;
  margin-top: var(--space-2);
}

.login-footer {
  margin-top: var(--space-6);
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
