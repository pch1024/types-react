import {Callback} from '../model/model'

export const throttle = (fn: Callback, delay: number, immediately: boolean): Callback => {
    // console.log('函数节流：' + fn.name)
    let [context, timer] = [this, null];
    return (): void => {
        if (!timer && immediately) fn();
        if (!timer && !immediately) {
            timer = setTimeout((): void => {
                fn.call(context);
                timer = null;
            }, delay);
        }
        // if (timer) return false;
    };
};
