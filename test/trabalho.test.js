const GerenciadorDeTarefas = require('../src/trabalho');
describe('Testes para a classe GerenciadorDeTarefas', () => {
  let gerenciador = null;

  beforeEach(() => {
    gerenciador = new GerenciadorDeTarefas();
  });

  describe('Testando o método adicionarTarefa', () => {
    test('Deve adicionar tarefa com descrição de +3 caracteres na descrição', () => {
      gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
      expect(gerenciador.listarTarefas()).toEqual([
        { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false }
      ]);
    });

    test('Deve adicionar tarefa com descrição de -3 caracteres na descrição', () => {
      expect(() => gerenciador.adicionarTarefa({
        id: 1, descricao: 'te',
        data: '04/09/2024', prioridade: 1, concluida: false
      })).toThrow('Erro ao cadastrar tarefa');
    });
  });

  test('Deve remover tarefa', () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.removerTarefa(1);
    expect(gerenciador.listarTarefas()).toEqual([]);
  })

  test('Deve buscar tarefa por id', () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    expect(gerenciador.buscarTarefaPorId(1)).toEqual({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
  });

  describe('Testando o método atualizarTarefa', () => {
    test('Deve atualizar tarefa(index != -1)', () => {
      gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
      gerenciador.atualizarTarefa(1, { descricao: 'Tarefa Teste', data: '04/09/2024', prioridade: 1, concluida: false });
      expect(gerenciador.listarTarefas()).toEqual([
        { id: 1, descricao: 'Tarefa Teste', data: '04/09/2024', prioridade: 1, concluida: false }
      ]);
    })

    test('Deve atualizar tarefa(index == -1)', () => {
      gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
      gerenciador.atualizarTarefa(2, { descricao: 'Tarefa Teste', data: '04/09/2024', prioridade: 1, concluida: false });
      expect(gerenciador.listarTarefas()).toEqual([
        { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false }
      ]);
    })
  })

  test('Deve listar tarefas', () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    expect(gerenciador.listarTarefas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false },
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false }
    ]);
  })

  test("Deve contar o número de tarefas", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    expect(gerenciador.contarTarefas()).toBe(2);
  })

  test('Deve marcar tarefa como concluida por id', () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.marcarTarefaComoConcluida(1);
    expect(gerenciador.listarTarefas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: true }
    ]);
  })

  test('Deve listar tarefas concluidas', () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.marcarTarefaComoConcluida(1);
    expect(gerenciador.listarTarefasConcluidas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: true }
    ]);
  })

  test('Deve listar tarefas pendentes', () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.marcarTarefaComoConcluida(1);
    expect(gerenciador.listarTarefasPendentes()).toEqual([
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false }
    ]);
  })

  test("Deve remover tarefas concluidas", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.marcarTarefaComoConcluida(1);
    gerenciador.marcarTarefaComoConcluida(2);
    gerenciador.removerTarefasConcluidas();
    expect(gerenciador.listarTarefas()).toEqual([]);
  })

  test("Buscar tarefa por descricao", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.adicionarTarefa({ id: 3, descricao: 'Tarefa 3', data: '04/09/2024', prioridade: 3, concluida: false });
    expect(gerenciador.buscarTarefaPorDescricao('Tarefa 1')).toEqual([{ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false }]);
  })

  test("Deve adicionar uma tag a uma tarefa", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTagATarefa(1, 'Tag Teste');
    expect(gerenciador.listarTarefas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false, tags: ['Tag Teste'] }
    ]);
  })

  test("Deve remover uma tag de uma tarefa", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false, tags: ['Tag Teste'] });
    gerenciador.removerTagDaTarefa(1, 'Tag Teste');
    expect(gerenciador.listarTarefas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false, tags: [] }
    ]);
  })

  test("Deve listar tarefas por tag", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false, tags: ['Tag Teste'] });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false, tags: ['Tag Teste'] });
    gerenciador.adicionarTarefa({ id: 3, descricao: 'Tarefa 3', data: '04/09/2024', prioridade: 3, concluida: false, tags: ['Tag Teste2'] });
    expect(gerenciador.listarTarefasPorTag('Tag Teste')).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false, tags: ['Tag Teste'] },
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false, tags: ['Tag Teste'] }
    ]);
  })

  test("Deve buscar tarefas por data", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '02/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.adicionarTarefa({ id: 3, descricao: 'Tarefa 3', data: '04/09/2024', prioridade: 3, concluida: false });
    expect(gerenciador.buscarTarefasPorData('04/09/2024')).toEqual([
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false },
      { id: 3, descricao: 'Tarefa 3', data: '04/09/2024', prioridade: 3, concluida: false }
    ]);
  })

  test("Deve atualizar prioridade", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.atualizarPrioridade(1, 3);
    expect(gerenciador.listarTarefas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 3, concluida: false }
    ]);
  })

  test("Deve listar tarefas por prioridade", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.adicionarTarefa({ id: 3, descricao: 'Tarefa 3', data: '04/09/2024', prioridade: 3, concluida: false });
    expect(gerenciador.listarTarefasPorPrioridade(2)).toEqual([
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false }
    ]);
  })

  test("Deve contar tarefas por prioridade", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.adicionarTarefa({ id: 3, descricao: 'Tarefa 3', data: '04/09/2024', prioridade: 3, concluida: false });
    expect(gerenciador.contarTarefasPorPrioridade(2)).toBe(1);
  })

  test("Deve marcar todas as tarefas como concluidas", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.marcarTodasComoConcluidas()
    expect(gerenciador.listarTarefasConcluidas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: true },
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: true }
    ]);
  })

  test("Deve reabrir uma tarefa", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.marcarTarefaComoConcluida(1);
    gerenciador.reabrirTarefa(1);
    expect(gerenciador.listarTarefas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false },
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false }
    ]);
  })

  test("Deve ordenar tarefas por data", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '03/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.adicionarTarefa({ id: 3, descricao: 'Tarefa 3', data: '05/09/2024', prioridade: 3, concluida: false });
    gerenciador.ordenarTarefasPorData();
    expect(gerenciador.listarTarefas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '03/09/2024', prioridade: 1, concluida: false },
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false },
      { id: 3, descricao: 'Tarefa 3', data: '05/09/2024', prioridade: 3, concluida: false }
    ]);
  })

  test("Deve ordenar tarefas por prioridade", () => {
    gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false });
    gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false });
    gerenciador.adicionarTarefa({ id: 3, descricao: 'Tarefa 3', data: '04/09/2024', prioridade: 3, concluida: false });
    gerenciador.ordenarTarefasPorPrioridade();
    expect(gerenciador.listarTarefas()).toEqual([
      { id: 1, descricao: 'Tarefa 1', data: '04/09/2024', prioridade: 1, concluida: false },
      { id: 2, descricao: 'Tarefa 2', data: '04/09/2024', prioridade: 2, concluida: false },
      { id: 3, descricao: 'Tarefa 3', data: '04/09/2024', prioridade: 3, concluida: false }
    ]);
  })
})

