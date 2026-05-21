<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useToastStore } from '../stores/toast';
import Input from '../components/ui/Input.vue';
import Button from '../components/ui/Button.vue';
import { Lock, Building2, ChevronRight } from 'lucide-vue-next';

const router = useRouter();
const auth = useAuthStore();
const toast = useToastStore();

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
      toast.show('Bem-vindo ao Cesta Mais!', 'success');
      router.push('/dashboard');
    }
  } catch (err: any) {
    toast.show(err.message || 'Credenciais inválidas ou erro no servidor.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-[440px]">
      <!-- Logo/Brand -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-[2rem] shadow-xl shadow-primary-200 mb-6 rotate-3">
          <span class="text-white font-black text-4xl">C+</span>
        </div>
        <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Cesta<span class="text-primary-600">Mais</span></h1>
        <p class="text-slate-500 font-medium mt-2">Painel de Monitoramento de Preços</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        
        <header class="mb-8 relative z-10">
          <h2 class="text-2xl font-bold text-slate-800">Login</h2>
          <p class="text-slate-500 text-sm mt-1">Acesse com o CNPJ do seu supermercado</p>
        </header>

        <form @submit.prevent="handleLogin" class="space-y-6 relative z-10">
          <div class="space-y-4">
            <Input
              v-model="form.cnpj"
              label="CNPJ da Empresa"
              placeholder="00.000.000/0000-00"
              :mask="maskCNPJ"
              :error="errors.cnpj"
            >
              <template #icon>
                <Building2 class="text-slate-400" :size="20" />
              </template>
            </Input>

            <Input
              v-model="form.senha"
              label="Senha de Acesso"
              type="password"
              placeholder="••••••••"
              :error="errors.senha"
            >
              <template #icon>
                <Lock class="text-slate-400" :size="20" />
              </template>
            </Input>
          </div>
          
          <Button 
            type="submit" 
            :loading="isLoading" 
            variant="primary" 
            size="lg" 
            class="w-full h-14 !rounded-2xl group"
          >
            Entrar no Painel
            <ChevronRight class="group-hover:translate-x-1 transition-transform" :size="20" />
          </Button>
        </form>

        <footer class="mt-10 text-center border-t border-slate-50 pt-6">
          <p class="text-slate-400 text-sm">
            Problemas com o acesso? 
            <a href="#" class="text-primary-600 font-bold hover:underline">Fale com o Suporte</a>
          </p>
        </footer>
      </div>

      <!-- App Info -->
      <div class="mt-12 flex items-center justify-center gap-6 grayscale opacity-40">
        <div class="flex items-center gap-2 font-bold text-slate-500">
          <div class="w-6 h-6 bg-slate-300 rounded-md"></div>
          DIEESE
        </div>
        <div class="flex items-center gap-2 font-bold text-slate-500">
          <div class="w-6 h-6 bg-slate-300 rounded-md"></div>
          CROWDSOURCING
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No scoped CSS needed as we are using Tailwind exclusively */
</style>
