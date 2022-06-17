var memory = {
    memory: new Array(0xffff)
}

var bus = {write: (addr, data) => {
    if(addr >= 0x0000 && addr <= 0x0000) {memory.memory[addr] = data}
}, read: (addr) => {
    if(addr >= 0x0000 && addr <= 0x0000) {return memory.memory[data]}
}}

var cpu = {
    registers: {a: 0x00, x: 0x00, y:0x00},
    alu: {a: 0x00, b: 0x00, sum: 0x00},
    opcode: 0x00,
    program_counter: 0x0000,
    addr: 0x0000,
    emulate: function() {
        function carry_check(value) {
            if(value > 0xff) {
                cpu.status = cpu.status | 0b0000_0001;
              } else {
                cpu.status = cpu.status & 0b1111_1110;
            }
          };
        function zero_check(value) {
            if(value == 0) {
                cpu.status = cpu.status | 0b0000_0010;
              } else {
                cpu.status = cpu.status & 0b1111_1101;
            }
          };
          /*function interrupt_check(value) {   **to be implemented later
            if(value > 0xff) {
                cpu.status = cpu.status | 0b0000_0001;
              } else {
                cpu.status = cpu.status & 0b1111_1110;
            }
          };*/
          /*function break_check(value) {     **to be implemented later
            if(value > 0xff) {
                cpu.status = cpu.status | 0b0000_0001;
              } else {
                cpu.status = cpu.status & 0b1111_1110;
            }
          };*/
        function overflow_check(m, n) {
              if(!( nor((nor(m[7], n[7]) & (n[6] & m[6]))), (nor(nand(m[7], n[7]), (m[6]&n[6])))) == 1) {
                  cpu.status |= 0b0100_0000;
              } else {
                  cpu.status &= 0b1011_1111;
              }
          };
        function negative_check(value) {
            if((value&0b1111_1111)[0] = 1) {
                cpu.status = cpu.status | 0b1000_0000;
              } else {
                cpu.status = cpu.status & 0b0111_1111;
            }
          };
          
        function nor(a, b) {
              return !(a||b)
          };
        function nand(a, b) {
              return !(a&&b)
          };
        
        function read16bit(addr) {
            one = bus.read(this.)
        }
        var addr = 0x0000;
        function check_addr_mode(addrmode) {
            if(addrmode == "ABS") {
                one = bus.read(this.program_counter)
                two = bus.read(this.program_counter + 1)
                addr = one | (two << 8)
            } else
            if(addrmode == "ZPG") {
                addr = bus.read(this.program_counter)
            } else
            if(addrmode == "ZPX") {
                addr = bus.read(this.program_counter) + this.registers.x
            } else
            if(addrmode == "ZPY") {
                addr = bus.read(this.program_counter) + this.registers.y
            }
        };
        function LDA(addr) {
            register.a = bus.read(addr)
            negative_check(register.a)
            zero_check(register.a)
        } 
    }
}