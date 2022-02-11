import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';

export default function useProps() {
  return useSelector((state: RootState) => state.propsReducer);
}
