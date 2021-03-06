import { Component } from 'react';

declare global {
    interface Window {
        scrollLockEnabled: boolean;
    }
}

export class ScrollLock extends Component<any> {
    public componentDidMount(): void {
        const originalWidth = document.documentElement.getBoundingClientRect().width;

        document.documentElement.style.overflow = 'hidden';

        if (!window.scrollLockEnabled) {
            const newWidth = document.documentElement.getBoundingClientRect().width;

            document.documentElement.style.marginRight = `${newWidth - originalWidth}px`;
            window.scrollLockEnabled = true;
        }
    }

    public componentWillUnmount(): void {
        document.documentElement.style.overflow = '';
        document.documentElement.style.marginRight = '';
        window.scrollLockEnabled = false;
    }

    public render(): React.ReactNode {
        return null;
    }
}
