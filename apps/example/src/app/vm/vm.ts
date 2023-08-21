import { useViewModel } from '@xeinebiu/react-mvvm';
import { HomeViewModel } from './home.vm';
import { PostsViewModel } from './posts.vm';

export function useGlobalViewModel() {
    return useViewModel<{ home: HomeViewModel; posts: PostsViewModel }>();
}
