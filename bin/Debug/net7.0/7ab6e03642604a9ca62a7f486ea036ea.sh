function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 17863;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 17863 > /dev/null;
done;

for child in $(list_child_processes 17867);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/rushithkarunaratne/Desktop/Media-Information-System/bin/Debug/net7.0/7ab6e03642604a9ca62a7f486ea036ea.sh;
