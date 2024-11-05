/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessageBar, MessageBarType } from '@fluentui/react';
import * as React from 'react';
import { MessageScope } from '../../../../helpers/EnumHelper';
import styles from './MessageContainer.module.scss';


export interface IMessageContainerProps {
    Message?: string;
    MessageScope: MessageScope;
}

export default function MessageContainer(props: IMessageContainerProps): JSX.Element {
    return (
        <div className={styles.MessageContainer}>
            {
                props.MessageScope === MessageScope.Success &&
                <MessageBar messageBarType={MessageBarType.success}>
                   <div>{props.Message}</div>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Failure &&
                <MessageBar messageBarType={MessageBarType.error}>
                    <div>{props.Message}</div>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Warning &&
                <MessageBar messageBarType={MessageBarType.warning}>
                     <div>{props.Message}</div>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Info &&
                <MessageBar className={styles.infoMessage}>
                     <div>{props.Message}</div>
                </MessageBar>
            }
        </div>
    );
}