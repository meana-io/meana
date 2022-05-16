import { toRefs, reactive } from '@vue/composition-api';
import api from '../utils/axios';

interface State<T> {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  data: T;
}

type method = 'get' | 'post' | 'put' | 'patch' | 'delete';

const useApi = async <T>(url: string, method: method = 'get') => {
  const state = reactive<State<T>>({
    isLoading: true,
    hasError: false,
    errorMessage: '',
    data: null,
  });

  const sendRequest = async () => {
    try {
      const { data } = await api[method](url);
      state.data = data;
      state.isLoading = false;
    } catch (error: unknown) {
      const typedError = error as Error;

      state.hasError = true;
      state.errorMessage = typedError.message;
    } finally {
      state.isLoading = false;
    }
  };

  await sendRequest();

  return {
    ...toRefs(state),
  };
};

export default useApi;
