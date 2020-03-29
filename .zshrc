# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.


export ZSH="/home/zero/.oh-my-zsh"
# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
ZSH_THEME="powerlevel10k/powerlevel10k"
POWERLEVEL9K_MODE='nerdfont-complete'

###colors
P9KGT_RED=009
P9KGT_GREEN=010
P9KGT_YELLOW=011
P9KGT_BLUE=012





# Please only use this battery segment if you have material icons in your nerd font (or font)
# Otherwise, use the font awesome one in "User Segments"
zsh_battery_level() {
  local percentage1=`acpi | grep -o '[0-9]*%'`
  local percentage=`echo "${percentage1//\%}"`

  local color='%F{red}'
  local symbol="\uf00d"
  acpi | grep "Discharging" > /dev/null
  if [ $? -eq 0 ]; then
    local charging="false";
  else
    local charging="true";
  fi
  if [ $percentage -le 20 ]
  then symbol='\uf579' ; color='%F{red}' ;
    #10%
  elif [ $percentage -gt 19 ] && [ $percentage -le 30 ]
  then symbol="\uf57a" ; color='%F{red}' ;
    #20%
  elif [ $percentage -gt 29 ] && [ $percentage -le 40 ]
  then symbol="\uf57b" ; color='%F{yellow}' ;
    #35%
  elif [ $percentage -gt 39 ] && [ $percentage -le 50 ]
  then symbol="\uf57c" ; color='%F{yellow}' ;
    #45%
  elif [ $percentage -gt 49 ] && [ $percentage -le 60 ]
  then symbol="\uf57d" ; color='%F{blue}' ;
    #55%
  elif [ $percentage -gt 59 ] && [ $percentage -le 70 ]
  then symbol="\uf57e" ; color='%F{blue}' ;
    #65%
  elif [ $percentage -gt 69 ] && [ $percentage -le 80 ]
  then symbol="\uf57f" ; color='%F{blue}' ;
    #75%
  elif [ $percentage -gt 79 ] && [ $percentage -le 90 ]
  then symbol="\uf580" ; color='%F{blue}' ;
    #85%
  elif [ $percentage -gt 89 ] && [ $percentage -le 99 ]
  then symbol="\uf581" ; color='%F{blue}' ;
    #85%
  elif [ $percentage -gt 98 ]
  then symbol="\uf578" ; color='%F{green}' ;
    #100%
  fi
  if [ $charging = "true" ];
  then color='%F{green}'; symbol='\ufba3';
  fi
  echo -n " %{$color%}$symbol %F{white}$percentage%% " ;
}



zsh_internet_signal(){
local symbol="\uf1eb"
local name=`iw dev wlp2s0 info | grep -i "ssid" | awk '{print $2}'`
local strength=`cat /proc/net/wireless | grep -i "wlp2s0" | awk '{print substr($3,1,length($3)-1)}'`

if [ -z "$strength" ]
then
    #empty
      INTERNET_BACKGROUND=$P9KGT_RED
      echo -n "\ufaa9 Not Connected"
      
else
      INTERNET_BACKGROUND=$P9KGT_GREEN
      echo -n "$symbol  $name $strength/70"
      

fi
}
###internet helper function
internet_helper(){
local strength=`cat /proc/net/wireless | grep -i "wlp2s0" | awk '{print substr($3,1,length($3)-1)}'`

if [ -z "$strength" ]
then
    #empty
      INTERNET_BACKGROUND=$P9KGT_RED
      
      
else
      INTERNET_BACKGROUND=$P9KGT_GREEN
      
      

fi
}
internet_helper



user_with_skull() {
    echo -n "%F{cyan} \uF303 "
}

py_version(){
  
  echo -n "\ue235  `python --version |awk '{print $2}'`"
}










POWERLEVEL9K_COLOR_SCHEME='bright'
POWERLEVEL9K_PROMPT_ON_NEWLINE=true
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
POWERLEVEL9K_RPROMPT_ON_NEWLINE=true
POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX="%F{014}\u2570%F{cyan}\uF460%F{073}\uF460%F{109}\uF460%f "

#POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(codetalk context custom_internet_signal  ssh root_indicator dir dir_writable vcs)
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(custom_os_icon context ssh root_indicator dir_writable dir vcs anaconda custom_python_version )
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=( status  command_execution_time  ram custom_battery_level custom_internet_signal time)
HIST_STAMPS="dd/mm/yyyy"


#context settings
DEFAULT_USER=None
POWERLEVEL9K_CONTEXT_ALWAYS_SHOW_USER=true;
POWERLEVEL9K_CONTEXT_TEMPLATE="%n@%m"
#User
POWERLEVEL9K_CONTEXT_DEFAULT_FOREGROUND=$P9KGT_YELLOW
POWERLEVEL9K_CONTEXT_ROOT_FOREGROUND=$P9KGT_YELLOW
POWERLEVEL9K_CONTEXT_SUDO_FOREGROUND=$P9KGT_YELLOW
POWERLEVEL9K_CONTEXT_REMOTE_FOREGROUND=$P9KGT_YELLOW
POWERLEVEL9K_CONTEXT_REMOTE_SUDO_FOREGROUND=$P9KGT_YELLOW
POWERLEVEL9K_CONTEXT_DEFAULT_BACKGROUND=$P9KGT_TERMINAL_BACKGROUND
POWERLEVEL9K_CONTEXT_ROOT_BACKGROUND=$P9KGT_TERMINAL_BACKGROUND
POWERLEVEL9K_CONTEXT_SUDO_BACKGROUND=$P9KGT_TERMINAL_BACKGROUND
POWERLEVEL9K_CONTEXT_REMOTE_BACKGROUND=$P9KGT_TERMINAL_BACKGROUND
POWERLEVEL9K_CONTEXT_REMOTE_SUDO_BACKGROUND=$P9KGT_TERMINAL_BACKGROUND
#dir writable
POWERLEVEL9K_DIR_WRITABLE_FORBIDDEN_FOREGROUND=$P9KGT_YELLOW
POWERLEVEL9K_DIR_WRITABLE_FORBIDDEN_BACKGROUND=$P9KGT_RED
POWERLEVEL9K_DIR_SHOW_WRITABLE=true
##
POWERLEVEL9K_USER_WITH_SKULL_BACKGROUND=$P9KGT_RED

POWERLEVEL9K_DIR_DEFAULT_FOREGROUND=$P9KGT_TERMINAL_BACKGROUND
    POWERLEVEL9K_DIR_HOME_FOREGROUND=$P9KGT_TERMINAL_BACKGROUND
    POWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND=$P9KGT_TERMINAL_BACKGROUND
    POWERLEVEL9K_DIR_ETC_FOREGROUND=$P9KGT_TERMINAL_BACKGROUND
    POWERLEVEL9K_DIR_DEFAULT_BACKGROUND=$P9KGT_BLUE
    POWERLEVEL9K_DIR_HOME_BACKGROUND=$P9KGT_BLUE
    POWERLEVEL9K_DIR_HOME_SUBFOLDER_BACKGROUND=$P9KGT_BLUE
    POWERLEVEL9K_DIR_ETC_BACKGROUND=$P9KGT_BLUE

    # Set 'vcs' segment colors
    # https://github.com/bhilburn/powerlevel9k/blob/next/segments/vcs/README.md
POWERLEVEL9K_VCS_CLEAN_FOREGROUND=$P9KGT_TERMINAL_BACKGROUND
POWERLEVEL9K_VCS_MODIFIED_FOREGROUND=$P9KGT_TERMINAL_BACKGROUND
POWERLEVEL9K_VCS_CLOBBERED_FOREGROUND=$P9KGT_TERMINAL_BACKGROUND
POWERLEVEL9K_VCS_UNTRACKED_FOREGROUND=$P9KGT_TERMINAL_BACKGROUND
    POWERLEVEL9K_VCS_CLEAN_BACKGROUND=$P9KGT_GREEN
    POWERLEVEL9K_VCS_MODIFIED_BACKGROUND=$P9KGT_YELLOW
    POWERLEVEL9K_VCS_CLOBBERED_BACKGROUND=$P9KGT_RED
    POWERLEVEL9K_VCS_UNTRACKED_BACKGROUND=$P9KGT_GREEN

    # VCS icons
POWERLEVEL9K_VCS_GIT_ICON=$'\uf1d2 '
POWERLEVEL9K_VCS_GIT_GITHUB_ICON=$'\uf113 '
POWERLEVEL9K_VCS_GIT_GITLAB_ICON=$'\uf296 '
#POWERLEVEL9K_VCS_BRANCH_ICON=$''
POWERLEVEL9K_VCS_STAGED_ICON=$'\uf055'
POWERLEVEL9K_VCS_UNSTAGED_ICON=$'\uf421'
POWERLEVEL9K_VCS_UNTRACKED_ICON=$'\uf00d'
POWERLEVEL9K_VCS_INCOMING_CHANGES_ICON=$'\uf0ab '
POWERLEVEL9K_VCS_OUTGOING_CHANGES_ICON=$'\uf0aa '

##custom os icon
POWERLEVEL9K_CUSTOM_OS_ICON="user_with_skull"
POWERLEVEL9K_CUSTOM_OS_ICON_BACKGROUND='black'

POWERLEVEL9K_CUSTOM_BATTERY_LEVEL="zsh_battery_level"
POWERLEVEL9K_CUSTOM_BATTERY_LEVEL_BACKGROUND=025
POWERLEVEL9K_CUSTOM_INTERNET_SIGNAL="zsh_internet_signal"
POWERLEVEL9K_CUSTOM_INTERNET_SIGNAL_BACKGROUND=$INTERNET_BACKGROUND
POWERLEVEL9K_CUSTOM_INTERNET_SIGNAL_FOREGROUND='white'

POWERLEVEL9K_CUSTOM_PYTHON_VERSION="py_version"
POWERLEVEL9K_CUSTOM_PYTHON_VERSION_FOREGROUND='white'
POWERLEVEL9K_CUSTOM_PYTHON_VERSION_BACKGROUND=024


# Set 'status' segment colors
# https://github.com/bhilburn/powerlevel9k/blob/next/segments/status/README.md
    POWERLEVEL9K_STATUS_CROSS=true
    POWERLEVEL9K_STATUS_OK_FOREGROUND=$P9KGT_GREEN
    POWERLEVEL9K_STATUS_ERROR_FOREGROUND=$P9KGT_RED
    POWERLEVEL9K_STATUS_OK_BACKGROUND=$P9KGT_TERMINAL_BACKGROUND
    POWERLEVEL9K_STATUS_ERROR_BACKGROUND=$P9KGT_TERMINAL_BACKGROUND

    # Set 'root_indicator' segment colors
    # https://github.com/bhilburn/powerlevel9k/blob/next/segments/root_indicator/README.md
    POWERLEVEL9K_ROOT_INDICATOR_FOREGROUND=$P9KGT_YELLOW
    POWERLEVEL9K_ROOT_INDICATOR_BACKGROUND=$P9KGT_TERMINAL_BACKGROUND

## time
POWERLEVEL9K_TIME_FORMAT="%D{\uf017 %H:%M \uf073 %d/%m/%y}"
POWERLEVEL9K_TIME_ICON="" 
POWERLEVEL9K_TIME_BACKGROUND='white'


## Anaconda
POWERLEVEL9K_ANACONDA_LEFT_DELIMITER=''
POWERLEVEL9K_ANACONDA_RIGHT_DELIMITER=''
POWERLEVEL9K_ANACONDA_FOREGROUND='white'
POWERLEVEL9K_ANACONDA_BACKGROUND=025

POWERLEVEL9K_PYTHON_ICON='\ue235'

#subsegment

#POWERLEVEL9K_LEFT_SUBSEGMENT_SEPARATOR=''
POWERLEVEL9K_COMMAND_EXECUTION_TIME_THRESHOLD=0

###powerlevel9k
#POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(context dir vcs public_ip custom_wifi_signal os_icon)
#POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(anaconda ssh time battery)






plugins=(
  git 
  zsh-syntax-highlighting
  zsh-autosuggestions
  extract
  colored-man-pages
  sudo
  history
  catimg
  npm
  pip 
  python 
  
  
)

source $ZSH/oh-my-zsh.sh



#added by Anaconda3 2018.12 installer
# >>> conda init >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$(CONDA_REPORT_ERRORS=false '/home/zero/Softwares/anaconda3/bin/conda' shell.bash hook 2> /dev/null)"
if [ $? -eq 0 ]; then
    \eval "$__conda_setup"
else
    if [ -f "/home/zero/Softwares/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/home/zero/Softwares/anaconda3/etc/profile.d/conda.sh"
        CONDA_CHANGEPS1=false conda activate base
    else
        \export PATH="/home/zero/Softwares/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda init <<<

ex ()
{
  if [ -f $1 ] ; then
    case $1 in
      *.tar.bz2)   tar xjf $1   ;;
      *.tar.gz)    tar xzf $1   ;;
      *.bz2)       bunzip2 $1   ;;
      *.rar)       unrar x $1     ;;
      *.gz)        gunzip $1    ;;
      *.tar)       tar xf $1    ;;
      *.tbz2)      tar xjf $1   ;;
      *.tgz)       tar xzf $1   ;;
      *.zip)       unzip $1     ;;
      *.Z)         uncompress $1;;
      *.7z)        7z x $1      ;;
      *)           echo "'$1' cannot be extracted via ex()" ;;
    esac
  else
    echo "'$1' is not a valid file"
  fi
}

if [[ $TILIX_ID ]]; then
        source /etc/profile.d/vte.sh
fi


#######################################################

export PATH="/home/zero/.gem/ruby/2.6.0/bin:$PATH"
alias ll='colorls -lA --sd --group-directories-first'
alias ls='colorls --group-directories-first'

LS_COLORS='di=1:fi=0:ln=31:pi=5:so=5:bd=5:cd=5:or=31:mi=0:ex=36:*.rpm=90'
export LS_COLORS

