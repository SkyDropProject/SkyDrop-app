import { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import { LikeButtonProps } from '@/app/interfaces/component';

import Icon from '../utils/Icon';

const LikeButton = (props: LikeButtonProps): ReactElement => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            {props.isLiked ? (
                <Icon.heart_filled width={23} height={23} />
            ) : (
                <Icon.heart width={23} height={23} />
            )}
        </TouchableOpacity>
    );
};
export default LikeButton;
