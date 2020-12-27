import { maxMobileScreenWidth } from '../constants';

export function isMobileView(): boolean {
    return window.screen.width <= maxMobileScreenWidth;
}