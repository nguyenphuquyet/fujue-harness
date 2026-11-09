#!/bin/sh
set -eu
ssh-keygen -q -t ed25519 -N '' -f /etc/ssh/ssh_host_ed25519_key
install -d -m 700 -o quyet -g quyet /home/quyet/.ssh
install -m 600 -o quyet -g quyet /fixture-key.pub /home/quyet/.ssh/authorized_keys
install -d -m 700 -o quyet -g quyet /home/quyet/workspace
exec /usr/sbin/sshd -D -e -f /etc/ssh/sshd_config
