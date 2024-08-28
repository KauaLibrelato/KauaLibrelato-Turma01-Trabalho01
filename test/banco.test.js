const Banco = require('../src/banco');

describe('Testes para a classe Banco', () => {
  let conta = null;
  let conta2 = null;

  beforeEach(() => {
    conta = new Banco('José', 1000);
    conta2 = new Banco('Maria', 1000);
  });

  test('Testando o método depositar', () => {
    conta.depositar(100);
    expect(conta.obterSaldo()).toBe(1100);
    expect(conta.obterHistorico()).toContainEqual({ tipo: 'Depósito', valor: 100 });
  });

  describe('Testando o método sacar', () => {
    test('Testando o método sacar com saldo positivo', () => {
      conta.sacar(1000)
      expect(conta.obterSaldo()).toBe(0);
      expect(conta.obterHistorico()).toContainEqual({ tipo: 'Saque', valor: 1000 });
    });

    test('Testando o método sacar com saldo insuficiente', () => {
      expect(() => conta.sacar(1100)).toThrow("Saldo insuficiente");
    });
  });

  test('Testando o método transferir', () => {
    conta.transferir(500, conta2);
    expect(conta.obterSaldo()).toBe(500);
    expect(conta2.obterSaldo()).toBe(1500);
    expect(conta.obterHistorico()).toContainEqual({ tipo: 'Transferência', valor: 500, destino: conta2.nome });
    expect(conta2.obterHistorico()).toContainEqual({ tipo: 'Depósito', valor: 500 });
  });

  test('Testando o método obter saldo', () => {
    expect(conta.obterSaldo()).toBe(1000);
  });

  test('Testando o método obter histórico', () => {
    conta.depositar(100);
    conta.sacar(500);
    expect(conta.obterHistorico()).toEqual([
      { tipo: 'Depósito', valor: 100 },
      { tipo: 'Saque', valor: 500 }
    ]);
  });

  test('Testando o método definir limite de saque', () => {
    conta.definirLimiteDeSaque(500);
    expect(conta.limiteDeSaque).toBe(500);
  });

  test('Testando o método verificar limite de saque', () => {
    conta.definirLimiteDeSaque(500);
    expect(conta.verificarLimiteDeSaque(400)).toBeTruthy();
    expect(() => conta.verificarLimiteDeSaque(600)).toThrow("Saque acima do limite permitido");
  });

  test('Testando o método aplicar juros', () => {
    conta.aplicarJuros(10);
    expect(conta.obterSaldo()).toBe(1100);
    expect(conta.obterHistorico()).toContainEqual({ tipo: 'Juros', valor: 100 });
  });

  test('Testando o método pagar conta', () => {
    conta.pagarConta(500, 'Conta de luz');
    expect(conta.obterSaldo()).toBe(500);
    expect(conta.obterHistorico()).toContainEqual({ tipo: 'Pagamento', valor: 500, descricao: 'Conta de luz' });
  });

  test('Testando o método obter total depositado', () => {
    conta.depositar(100);
    conta.depositar(200);
    expect(conta.obterTotalDepositado()).toBe(300);
  });
});
