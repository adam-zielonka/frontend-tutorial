# 1.2. Tools around development

## Operation System

There are some differences between operation system (Windows, MacOS, or base on Linux), but my approach is to make my environment for development similar across operation systems.

### Windows

Let's start with system form Microsoft. Linux and MacOS are UNIX-like systems and what we want on Windows is to have UNIX-like space. For years was develop many solution to solve this problem (like [Cyngwin](https://www.cygwin.com/)), but finally Microsoft create own solution [WSL (Windows Subsystem of Linux)](https://learn.microsoft.com/en-us/windows/wsl/install). And this solution create Linux-base space so we can now use tools created for Unix-like systems. 

Also Microsoft create [Windows Terminal](https://github.com/microsoft/terminal) (now included in newest releases of Windows 11, if you don't have you can install form [GitHub](https://github.com/microsoft/terminal/releases), also in Windows 10).

### MacOS

MacOS is a UNIX-like system so there will be only one change to solve on minor problem. When you try to change name file `name.tsx` to `Name.tsx` this change will be ignored and not committed. So your code will be work only in MacOS, but for example on CI (that base on Linux), your code will be crash.

```shell
git config core.ignorecase false
```

The terminal app that I use is [iTerm2](https://iterm2.com/). Included in MacOS terminal have problem with proper render of [Nerd Fonts](https://www.nerdfonts.com/) and this was the one reason that I switch to something else.

### Linux

This our target, to make our development environment similar to. Nowadays I didn't use desktop distribution of Linux, but Linux is everywhere: WSL, CI, VPS. So I know a lot but without knowledge about GUI. I am aware of [GNOME](https://www.gnome.org/) and [KDE](https://kde.org/), but I don't have a lot of experience using them.

## Terminal

It's up to you there is a lot of tool in this area, you can find what you need, but what I use is [zsh](https://www.zsh.org/) with [oh-my-zsh](https://ohmyz.sh/) as a shell, with [starship](https://starship.rs/) as a prompt, and of course [Nerd Fonts](https://www.nerdfonts.com) need to be installed.

And that's all, if I have open project in VS Code, i mostly used builtin terminal.

## Version control - Git

TODO:

## Code editor - VS Code

TODO:

