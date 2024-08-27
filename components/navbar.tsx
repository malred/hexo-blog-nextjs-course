// components/navbar.tsx
"use client";
import {useTheme} from "next-themes";

export default function Navbar() {
    // 获取当前主题和设置主题的方法
    // resolvedTheme: 基于系统设置的当前主题(light或dark)
    // setTheme: 修改theme的方法
    const {setTheme, resolvedTheme} = useTheme();

    return (
        <nav className={
            `bg-green-200 dark:bg-green-800 border-b border-b-gray-300 sticky w-full h-20 flex items-center`
        }>
            <div className={'flex-1'}></div>
            {resolvedTheme !== 'dark' ?
                // 切换颜色主题的按钮
                <img className={'size-10'}
                     onClick={() => setTheme('dark')}
                     src="https://www.svgrepo.com/show/489517/mode-dark.svg"
                     alt="to dark theme mode"/> :
                <img className={'size-10'}
                     onClick={() => setTheme('light')}
                     src="https://www.svgrepo.com/show/489519/mode-light.svg"
                     alt="to light theme mode"/>
            }
        </nav>
    )
}