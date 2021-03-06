import { classy } from '@audentio/utils/src/classy';
import { keymap } from '@audentio/utils/src/keymap';
import CloseIcon from 'mdi-react/CloseIcon';
import React, { Component } from 'react';
import FocusLock from 'react-focus-lock';
import { Backdrop } from '../../Backdrop';
import { ScrollLock } from '../../ScrollLock';
import style from '../Modal.scss';

export default class ModalBox extends Component<any> {
    __node: HTMLElement;

    __nodeInner: HTMLElement;

    static defaultProps = {
        overlay: true,
    };

    public componentDidMount(): void {
        document.addEventListener('keydown', this.keyDownListener);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('keydown', this.keyDownListener);
    }

    private keyDownListener = (e): void => {
        const { onClose } = this.props;

        if (onClose && e.keyCode === keymap.ESCAPE) {
            onClose(e);
        }
    };

    public render(): React.ReactNode {
        const { overlay, opacity, children, className, containerClass, onClose, canClose, ...rest } = this.props;

        return (
            <FocusLock autoFocus>
                <div className={classy(style.wrapper, style.visible, containerClass)} style={{ opacity }} {...rest}>
                    {overlay && <Backdrop onClick={onClose} className={style.backdrop} />}

                    <div
                        ref={ref => {
                            if (!this.__node) {
                                this.__node = ref;
                            }
                        }}
                        className={classy(style.modal, className)}
                    >
                        <div
                            ref={ref => {
                                this.__nodeInner = ref;
                            }}
                        >
                            <span onClick={onClose}>
                                <CloseIcon size={20} className={style.dismiss} />
                            </span>
                            {children}
                        </div>
                    </div>

                    <ScrollLock />
                </div>
            </FocusLock>
        );
    }
}
