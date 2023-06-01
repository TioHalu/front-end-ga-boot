import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import styles from "./styles.module.scss"
interface TerminalProps {
  socketUrl: string;
}

interface TerminalProps {
  socketUrl: string;
}

const TerminalComponent: React.FC<TerminalProps> = ({ socketUrl }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    if (terminalRef.current) {
      term.open(terminalRef.current);
      fitAddon.fit();
      setTerminal(term);
    }

    return () => {
      if (term) {
        term.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!terminal || !socketUrl) return;

    const socket = new WebSocket(socketUrl);
    socket.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });

    socket.addEventListener('message', (event) => {
      if (terminal) {
          // new line ketika ada data baru dari websocket
        if (event.data.includes('\n')) {
          terminal.write(event.data);
          if(event.data.includes("root@be-single-service-fb46fdb49-wt2wr:/# ")){
            terminal.write("\r\n")
          }
        } else {
          if (event.data.includes('\b')) {
            terminal.write('\b \b');
          } 
          else if (event.data.includes('\u001b')) {
            terminal.write('\b \b');
          } 
          else if (event.data.includes('\t')) {
            terminal.write('\b \b');
          }
          else {
            terminal.write(event.data);
          }
        }
        
    
      

    }
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed.');
    });

    setSocket(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [terminal, socketUrl]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInput = (data: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    }
  };

 const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (terminal) {
    const printable = !event.altKey && !event.ctrlKey && !event.metaKey;

    if (event.key === 'Enter') {
      event.preventDefault();

      const input = terminal.buffer.active.getLine(terminal.buffer.active.baseY)?.translateToString();
      terminal.write('\r\n');
      handleInput(input);
    } else if (event.key === 'Backspace') {
      terminal.write('\b \b');
      handleInput('\b');
    } else if (printable) {
      terminal.write(event.key);
      handleInput(event.key);
    }
  }
};

  useEffect(() => {
    if (terminal) {
      terminal.onKey((e) => {
        handleInput(e.key);
      });
    }
  }, [handleInput, terminal]);


  return (
    <div className={styles.root}>
      <div ref={terminalRef} onKeyDown={handleKeydown} tabIndex={-1} className={styles.terminal} />
      </div>)
      
};



export default TerminalComponent;
