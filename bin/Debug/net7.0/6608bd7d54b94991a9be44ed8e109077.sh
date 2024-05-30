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

ps 17060;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 17060 > /dev/null;
done;

for child in $(list_child_processes 17072);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/rushithkarunaratne/Desktop/Marathon/bin/Debug/net7.0/6608bd7d54b94991a9be44ed8e109077.sh;
