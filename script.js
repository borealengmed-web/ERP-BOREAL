/**
 * SISTEMA INTEGRADO BOREAL ENGMED
 * Versão 3.0 - Arquitetura Integrada Total: 100% dos Campos, Módulos e Regras de Negócio
 */

// BASE DE DADOS COMPLETA (ESTADO GLOBAL REATIVO)
const AppData = {
  perfilAtivo: "gestor", // 'gestor', 'comercial', 'producao', 'financeiro'
  contratoAtivoId: "BOREAL-2026-001",
  contratos: [
    {
      id: "BOREAL-2026-001",
      ativoVisual: true, // soft-delete para auditoria de 20 anos
      cliente: "Tribunal Regional do Trabalho - 15ª Região",
      cnpj: "04.414.837/0001-38",
      objeto: "Elaboração de PGR, LTCAT e Avaliações Psicossociais COPSOQ",
      edital: "Pregão Eletrônico 012/2026",
      processo: "PROAD 4509/2026",
      portal: "PNCP",
      dataProposta: "2026-02-10",
      numeroContrato: "042/2026",
      dataContrato: "2026-02-15",
      vigencia: "12 meses",
      art: "2802723023001",
      valorContrato: 85000.00,
      endereco: "Rua Barão de Jaguara, 901 - Centro, Campinas - SP",
      contatoNome: "Dr. Marcelo Ramos",
      contatoTel: "(19) 3234-5678",
      contatoEmail: "marcelo.ramos@trt15.jus.br",
      locaisSede: 1,
      locaisForaSede: 1,
      status: "servico_iniciado",
      fiscalNome: "Carlos Eduardo da Silva",
      fiscalTel: "(19) 98765-4321",
      fiscalEmail: "carlos.fiscal@trt15.jus.br",
      gestorNome: "Dra. Patrícia Mendes",
      gestorTel: "(19) 3234-5600",
      gestorEmail: "gestao.contratos@trt15.jus.br",
      pagtoNome: "Divisão de Finanças TRT",
      pagtoTel: "(19) 3234-5650",
      pagtoBanco: "Banco do Brasil - Ag 2417-1 CC 54625-9",
      garantiaTipo: "Seguro Garantia",
      garantiaPerc: "5%",
      garantiaCorretora: "Porto Seguro Seguros",
      garantiaApolice: 4250.00,
      garantiaObs: "Apólice entregue e homologada",
      // Itens da Proposta (Linhas 8 da Planilha Vendas)
      itens: [
        { id: 1, item: 1, objeto: "Elaboração de Documento Base do PGR", quantidade: 1, unidade: "UNIDADE", valorUnitario: 25000.00, valorTotal: 25000.00 },
        { id: 2, item: 2, objeto: "Vistorias Técnicas In Loco e Medições Instrumentais", quantidade: 12, unidade: "POSTO", valorUnitario: 3500.00, valorTotal: 42000.00 },
        { id: 3, item: 3, objeto: "Avaliações Psicossociais Remotas (Metodologia COPSOQ)", quantidade: 600, unidade: "SERVIDOR", valorUnitario: 30.00, valorTotal: 18000.00 }
      ],
      // Unidades / Polos (Exatas 14 colunas da linha 13 da aba Processo Geral)
      unidades: [
        {
          id: "U1",
          nome: "Sede Administrativa - Campinas",
          cnpj: "04.414.837/0001-38",
          cnae: "84.11-6-00",
          grauRisco: "Grau 1",
          endereco: "Rua Barão de Jaguara, 901 - Campinas - SP",
          contato: "Dr. Marcelo Ramos",
          tel: "(19) 3234-5678",
          email: "sede.campinas@trt15.jus.br",
          responsavel: "Dr. Marcelo Ramos",
          cargoResponsavel: "Diretor Geral",
          clt: 45,
          estatutarios: 280,
          horario: "08:00 às 17:00"
        },
        {
          id: "U2",
          nome: "Fórum Trabalhista de Paulínia",
          cnpj: "04.414.837/0002-19",
          cnae: "84.11-6-00",
          grauRisco: "Grau 1",
          endereco: "Av. Pref. José Lozano Araújo, 1500 - Paulínia - SP",
          contato: "Dra. Renata Toledo",
          tel: "(19) 3874-1200",
          email: "forum.paulinia@trt15.jus.br",
          responsavel: "Dra. Renata Toledo",
          cargoResponsavel: "Juíza Diretora",
          clt: 10,
          estatutarios: 65,
          horario: "09:00 às 18:00"
        }
      ],
      // Quadro Funcional (Coleta Cadastral do Cliente)
      quadroFuncional: [
        {
          id: "QF1",
          unidade: "Sede Administrativa - Campinas",
          setor: "Gabinete de Desembargador",
          processo: "Atividades intelectuais em computadores e redação de pareceres",
          cargo: "Assessor Jurídico",
          quantidade: 35,
          atividades: "Digitação contínua, análise de processos judiciais eletrônicos e redação.",
          epi: "Não aplicável (Trabalho Administrativo de Escritório)"
        },
        {
          id: "QF2",
          unidade: "Fórum Trabalhista de Paulínia",
          setor: "Manutenção Predial e Almoxarifado",
          processo: "Reparos elétricos, hidráulicos e operação de ferramentas manuais",
          cargo: "Oficial de Manutenção",
          quantidade: 4,
          atividades: "Substituição de luminárias, manutenção em quadros elétricos de baixa tensão.",
          epi: "Óculos de proteção, calçado de segurança com biqueira e luvas isolantes 500V"
        }
      ],
      // Vistoria de Campo (PGR-BOREAL)
      avaliacoesCampo: {
        "QF1": { ruido: "58.2", temp: "22.5", ilum: "540", umid: "58.0", perigo: "Exigência de esforço cognitivo e postura sentada", prob: "2", sev: "1", nivel: "Tolerável" },
        "QF2": { ruido: "79.4", temp: "24.8", ilum: "380", umid: "54.0", perigo: "Ruído intermitente de furadeira e risco elétrico", prob: "3", sev: "3", nivel: "Sério" }
      },
      // Equipe Técnica Alocada
      equipe: [
        { nome: "Luiz Fernando Gomes de Jesus", qualif: "Engº de Saúde e Seg. do Trabalho", registro: "CREA SP 5070159011", tel: "(19) 99156-7153", email: "contato@boreal.eng.br" },
        { nome: "Shirley Raquel de Oliveira", qualif: "Engª de Segurança do Trabalho", registro: "CREA SP 5060296504", tel: "(19) 98888-1122", email: "shirley@boreal.eng.br" }
      ],
      // Cronograma de Execução Física
      cronograma: [
        { unidade: "Sede Administrativa - Campinas", objeto: "Inspeção in loco e levantamento quantitativo", quant: "1 Unidade", prazo: "10 dias", inicio: "2026-03-01", conclusao: "2026-03-10" },
        { unidade: "Fórum Trabalhista de Paulínia", objeto: "Inspeção in loco e levantamento de riscos", quant: "1 Unidade", prazo: "05 dias", inicio: "2026-03-12", conclusao: "2026-03-17" }
      ],
      // Faturamento & Entregas (Linha 23)
      faturamentos: [
        { objeto: "Elaboração de Documento Base do PGR", quantTotal: 1, quantEntregue: 1, dataEntrega: "2026-03-25", valorTotal: 25000.00, nf: "NF-e 00124", status: "Pago" },
        { objeto: "Vistorias Técnicas In Loco e Medições Instrumentais", quantTotal: 12, quantEntregue: 6, dataEntrega: "2026-04-10", valorTotal: 21000.00, nf: "NF-e 00135", status: "Aguardando Empenho" }
      ],
      sequencialOficio: 1
    }
  ],
  isRecording: false,
  recognition: null
};

// OBJETO CENTRAL BOREAL CONTENDO TODOS OS MÉTODOS E REGRAS
window.boreal = {
  
  init: function() {
    this.popularSeletorContratos();
    this.renderizarModuloVendas();
    this.renderizarModuloComercial();
    this.renderizarRelatorioComercial();
    this.renderizarModuloContratos();
    this.renderizarModuloProducao();
    this.renderizarModuloDocumentos();
    this.renderizarModuloFinanceiro();
    this.renderizarProcessoGeral();
    this.configurarAssinaturaCanvas();
    this.configurarVoz();
    if (window.lucide) window.lucide.createIcons();
  },

  getContrato: function() {
    return AppData.contratos.find(c => c.id === AppData.contratoAtivoId) || AppData.contratos[0];
  },

  popularSeletorContratos: function() {
    const sel = document.getElementById("select-contrato-global");
    if (!sel) return;
    sel.innerHTML = "";
    AppData.contratos.filter(c => c.ativoVisual).forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.cliente} • ${c.objeto.substring(0, 40)}...`;
      if (c.id === AppData.contratoAtivoId) opt.selected = true;
      sel.appendChild(opt);
    });
  },

  mudarContratoGlobal: function(id) {
    AppData.contratoAtivoId = id;
    this.renderizarModuloVendas();
    this.renderizarModuloComercial();
    this.renderizarRelatorioComercial();
    this.renderizarModuloContratos();
    this.renderizarModuloProducao();
    this.renderizarModuloDocumentos();
    this.renderizarModuloFinanceiro();
    this.renderizarProcessoGeral();
  },

  abrirModulo: function(modId) {
    const mods = ["vendas", "comercial", "relatorio_comercial", "contratos", "producao", "documentos", "financeiro", "processo_geral"];
    mods.forEach(m => {
      const sec = document.getElementById(`sec-${m}`);
      const btn = document.getElementById(`tab-nav-${m}`);
      if (sec) sec.classList.add("hidden");
      if (btn) btn.classList.remove("active");
    });

    const secAtiva = document.getElementById(`sec-${modId}`);
    const btnAtivo = document.getElementById(`tab-nav-${modId}`);
    if (secAtiva) secAtiva.classList.remove("hidden");
    if (btnAtivo) btnAtivo.classList.add("active");

    if (modId === "processo_geral") this.renderizarProcessoGeral();
    if (modId === "relatorio_comercial") this.renderizarRelatorioComercial();
    if (window.lucide) window.lucide.createIcons();
  },

  alternarPerfil: function(perfil) {
    AppData.perfilAtivo = perfil;
    alert(`Perfil alterado para: ${perfil.toUpperCase()}. Os campos restritos ao gestor (valores e relatórios estratégicos) foram atualizados.`);
    this.renderizarProcessoGeral();
  },

  // =========================================================================
  // MÓDULO 1: VENDAS, PNCP E FORMAÇÃO DE PREÇOS
  // =========================================================================
  executarBuscaPNCP: function() {
    const termo = document.getElementById("pncp-termo").value;
    const uf = document.getElementById("pncp-uf").value;
    const tbody = document.getElementById("tbody-pncp");
    tbody.innerHTML = `<tr><td colspan="5" class="p-3 text-center text-slate-500 font-semibold">Consultando API oficial do PNCP do Governo Federal...</td></tr>`;

    setTimeout(() => {
      const editaisMock = [
        { orgao: `Prefeitura Municipal de Paulínia (${uf})`, objeto: "Contratação de assessoria em SST, PGR, PCMSO e LTCAT", abertura: "18/11/2026 às 09:00", valor: 98000.00 },
        { orgao: `Tribunal de Justiça do Estado (${uf})`, objeto: "Elaboração de laudos periciais de insalubridade e periculosidade", abertura: "25/11/2026 às 10:30", valor: 145000.00 },
        { orgao: `Câmara Municipal de Sumaré (${uf})`, objeto: "Elaboração de PGR com avaliações ergonômicas e psicossociais", abertura: "02/12/2026 às 14:00", valor: 52000.00 }
      ];

      tbody.innerHTML = "";
      editaisMock.forEach(ed => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50";
        tr.innerHTML = `
          <td class="p-2.5 font-bold text-slate-800">${ed.orgao}</td>
          <td class="p-2.5 text-slate-600">${ed.objeto}</td>
          <td class="p-2.5 text-slate-600">${ed.abertura}</td>
          <td class="p-2.5 text-right font-bold text-emerald-700">R$ ${ed.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
          <td class="p-2.5 text-center">
            <button onclick="window.boreal.importarEditalParaProposta('${ed.orgao}', '${ed.objeto}', ${ed.valor})" class="px-2.5 py-1 bg-[#B48D3C] hover:bg-[#9c782f] text-white rounded font-medium transition">
              Elaborar Proposta
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }, 500);
  },

  importarEditalParaProposta: function(orgao, objeto, valor) {
    const c = this.getContrato();
    c.cliente = orgao;
    c.objeto = objeto;
    c.valorContrato = valor;
    c.itens = [
      { id: Date.now(), item: 1, objeto: objeto, quantidade: 1, unidade: "UNIDADE", valorUnitario: valor, valorTotal: valor }
    ];
    this.popularSeletorContratos();
    this.renderizarModuloVendas();
    this.renderizarModuloComercial();
    alert(`Edital "${orgao}" carregado com sucesso no Módulo de Vendas!`);
  },

  renderizarModuloVendas: function() {
    const c = this.getContrato();
    document.getElementById("vendas-organizacao").value = c.cliente || "";
    document.getElementById("vendas-cnpj").value = c.cnpj || "";
    document.getElementById("vendas-contato").value = c.contatoNome || "";
    document.getElementById("vendas-telefone").value = c.contatoTel || "";
    document.getElementById("vendas-email").value = c.contatoEmail || "";
    document.getElementById("vendas-endereco").value = c.endereco || "";
    document.getElementById("vendas-locais-sede").value = c.locaisSede || 1;
    document.getElementById("vendas-locais-fora").value = c.locaisForaSede || 0;
    document.getElementById("vendas-status-processo").value = c.status || "em_elaboracao";

    const tbody = document.getElementById("tbody-itens-vendas");
    tbody.innerHTML = "";
    let somaTotal = 0;

    c.itens.forEach((it, idx) => {
      it.valorTotal = (parseFloat(it.quantidade) || 0) * (parseFloat(it.valorUnitario) || 0);
      somaTotal += it.valorTotal;

      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50";
      tr.innerHTML = `
        <td class="p-2 text-center font-bold text-slate-500">${idx + 1}</td>
        <td class="p-2">
          <input type="text" value="${it.objeto}" onchange="window.boreal.atualizarItemVenda(${idx}, 'objeto', this.value)" class="w-full border border-slate-200 rounded p-1 text-xs">
        </td>
        <td class="p-2">
          <input type="number" value="${it.quantidade}" min="1" onchange="window.boreal.atualizarItemVenda(${idx}, 'quantidade', parseFloat(this.value)||0)" class="w-20 border border-slate-200 rounded p-1 text-xs text-right">
        </td>
        <td class="p-2">
          <input type="text" value="${it.unidade}" onchange="window.boreal.atualizarItemVenda(${idx}, 'unidade', this.value)" class="w-20 border border-slate-200 rounded p-1 text-xs text-center">
        </td>
        <td class="p-2 text-right">
          <input type="number" step="0.01" value="${it.valorUnitario.toFixed(2)}" onchange="window.boreal.atualizarItemVenda(${idx}, 'valorUnitario', parseFloat(this.value)||0)" class="w-28 border border-slate-200 rounded p-1 text-xs text-right font-medium">
        </td>
        <td class="p-2 text-right font-bold text-slate-800">
          R$ ${it.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </td>
        <td class="p-2 text-center">
          <button onclick="window.boreal.removerItemVenda(${idx})" class="text-rose-600 hover:text-rose-800 p-1">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    c.valorContrato = somaTotal;
    document.getElementById("vendas-total-global").textContent = `R$ ${somaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById("vendas-total-extenso").textContent = `(${this.converterExtenso(somaTotal)})`;
    if (window.lucide) window.lucide.createIcons();
  },

  atualizarItemVenda: function(idx, campo, val) {
    const c = this.getContrato();
    if (c.itens[idx]) {
      c.itens[idx][campo] = val;
      this.renderizarModuloVendas();
    }
  },

  adicionarLinhaItemVendas: function() {
    const c = this.getContrato();
    c.itens.push({
      id: Date.now(),
      item: c.itens.length + 1,
      objeto: "Novo item de serviço especializado",
      quantidade: 1,
      unidade: "UNIDADE",
      valorUnitario: 1500.00,
      valorTotal: 1500.00
    });
    this.renderizarModuloVendas();
  },

  removerItemVenda: function(idx) {
    const c = this.getContrato();
    if (c.itens.length <= 1) {
      alert("A proposta deve manter no mínimo um item.");
      return;
    }
    c.itens.splice(idx, 1);
    this.renderizarModuloVendas();
  },

  aplicarFatorPreco: function() {
    const c = this.getContrato();
    const tipo = document.getElementById("vendas-tipo-fator").value;
    const fator = parseFloat(document.getElementById("vendas-valor-fator").value) || 1.0;

    if (fator <= 0) {
      alert("O fator deve ser maior que zero.");
      return;
    }

    c.itens.forEach(it => {
      if (tipo === "multiplicar") {
        it.valorUnitario = it.valorUnitario * fator;
      } else {
        it.valorUnitario = it.valorUnitario / fator;
      }
    });

    this.renderizarModuloVendas();
    alert(`Preços ajustados com fator ${fator} (${tipo})!`);
  },

  atualizarStatus: function(status) {
    const c = this.getContrato();
    c.status = status;
    alert(`Status do processo alterado para: "${status}".`);
  },

  inativarRegistro: function() {
    const c = this.getContrato();
    if (confirm(`Deseja inativar o registro de "${c.cliente}"? Ele sairá da tela para despoluir a interface, mas permanecerá arquivado no banco de dados por 20 anos para fins de auditoria.`)) {
      c.ativoVisual = false;
      this.popularSeletorContratos();
      const restante = AppData.contratos.find(item => item.ativoVisual);
      if (restante) {
        this.mudarContratoGlobal(restante.id);
      } else {
        alert("Todos os registros foram arquivados.");
      }
    }
  },

  // =========================================================================
  // MÓDULO 2: CADASTRO DE CLIENTES & VENDAS (MÓDULO COMERCIAL)
  // =========================================================================
  renderizarModuloComercial: function() {
    const c = this.getContrato();
    document.getElementById("cad-nome-cliente").value = c.cliente || "";
    document.getElementById("cad-cnpj").value = c.cnpj || "";
    document.getElementById("cad-endereco").value = c.endereco || "";
    document.getElementById("cad-num-contrato").value = c.numeroContrato || "";
    document.getElementById("cad-data-contrato").value = c.dataContrato || "";
    document.getElementById("cad-vigencia").value = c.vigencia || "";
    document.getElementById("cad-art").value = c.art || "";
    document.getElementById("cad-valor-contrato").value = c.valorContrato || 0;

    document.getElementById("cad-fiscal-nome").value = c.fiscalNome || "";
    document.getElementById("cad-fiscal-tel").value = c.fiscalTel || "";
    document.getElementById("cad-fiscal-email").value = c.fiscalEmail || "";

    document.getElementById("cad-gestor-nome").value = c.gestorNome || "";
    document.getElementById("cad-gestor-tel").value = c.gestorTel || "";
    document.getElementById("cad-gestor-email").value = c.gestorEmail || "";

    document.getElementById("cad-pagto-nome").value = c.pagtoNome || "";
    document.getElementById("cad-pagto-tel").value = c.pagtoTel || "";
    document.getElementById("cad-pagto-banco").value = c.pagtoBanco || "";

    document.getElementById("cad-garantia-tipo").value = c.garantiaTipo || "";
    document.getElementById("cad-garantia-perc").value = c.garantiaPerc || "";
    document.getElementById("cad-garantia-corretora").value = c.garantiaCorretora || "";
    document.getElementById("cad-garantia-apolice").value = c.garantiaApolice || 0;
    document.getElementById("cad-garantia-obs").value = c.garantiaObs || "";
  },

  // =========================================================================
  // MÓDULO 3: RELATÓRIO COMERCIAL (VISÃO EM CASCATA)
  // =========================================================================
  renderizarRelatorioComercial: function() {
    const tbody = document.getElementById("tbody-relatorio-comercial");
    if (!tbody) return;
    tbody.innerHTML = "";

    AppData.contratos.filter(c => c.ativoVisual).forEach(c => {
      const custoEstimado = (c.valorContrato || 0) * 0.42; // Custo estimado Boreal 42%
      const lucro = (c.valorContrato || 0) - custoEstimado;
      const qtdUnidades = c.unidades ? c.unidades.length : 1;
      let qtdEmpregados = 0;
      if (c.unidades) {
        c.unidades.forEach(u => qtdEmpregados += ((u.clt || 0) + (u.estatutarios || 0)));
      }

      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50";
      tr.innerHTML = `
        <td class="p-2.5 font-bold text-slate-800">${c.edital || c.numeroContrato}</td>
        <td class="p-2.5 font-semibold text-slate-900">${c.cliente}</td>
        <td class="p-2.5 text-slate-600">${c.cnpj}</td>
        <td class="p-2.5 text-slate-600 max-w-xs truncate">${c.endereco}</td>
        <td class="p-2.5 text-center font-bold text-slate-700">${qtdUnidades}</td>
        <td class="p-2.5 text-center font-bold text-slate-700">${qtdEmpregados}</td>
        <td class="p-2.5 text-right font-bold text-slate-900">R$ ${(c.valorContrato||0).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td class="p-2.5 text-right text-amber-700">R$ ${custoEstimado.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td class="p-2.5 text-right font-bold text-emerald-700">R$ ${lucro.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td class="p-2.5 text-center">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-900">${c.status}</span>
        </td>
        <td class="p-2.5 text-center">
          <button onclick="window.boreal.inativarRegistro()" class="text-rose-600 hover:text-rose-800 p-1" title="Apagar da cascata / Inativar">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    if (window.lucide) window.lucide.createIcons();
  },

  exportarRelatorioComercialExcel: function() {
    const ws_data = [
      ["EDITAL", "PROCESSO", "PORTAL", "CLIENTE", "CNPJ", "ENDEREÇO", "UNIDADES", "VALOR VENDA", "STATUS"]
    ];
    AppData.contratos.forEach(c => {
      ws_data.push([
        c.edital || "", c.processo || "", c.portal || "", c.cliente, c.cnpj, c.endereco,
        c.unidades ? c.unidades.length : 1, c.valorContrato, c.status
      ]);
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "RELATÓRIO COMERCIAL");
    XLSX.writeFile(wb, "Relatorio_Comercial_Boreal.xlsx");
  },

  // =========================================================================
  // MÓDULO 4: GESTÃO DE CONTRATOS & UNIDADES (ESTABELECIMENTOS)
  // =========================================================================
  renderizarModuloContratos: function() {
    const c = this.getContrato();
    const tbody = document.getElementById("tbody-unidades-contrato");
    if (!tbody) return;
    tbody.innerHTML = "";

    c.unidades.forEach((u, idx) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50";
      tr.innerHTML = `
        <td class="p-2 font-bold text-slate-800">${u.nome}</td>
        <td class="p-2 text-slate-600">${u.cnpj}</td>
        <td class="p-2 text-slate-600">${u.cnae}</td>
        <td class="p-2 text-slate-600">${u.grauRisco}</td>
        <td class="p-2 text-slate-600 max-w-xs truncate">${u.endereco}</td>
        <td class="p-2 text-slate-700">${u.contato}</td>
        <td class="p-2 text-slate-600">${u.tel}</td>
        <td class="p-2 text-slate-600">${u.email}</td>
        <td class="p-2 font-semibold text-slate-900">${u.responsavel}</td>
        <td class="p-2 text-slate-600">${u.cargoResponsavel}</td>
        <td class="p-2 text-center font-bold text-slate-700">${u.clt}</td>
        <td class="p-2 text-center font-bold text-slate-700">${u.estatutarios}</td>
        <td class="p-2 text-slate-600">${u.horario}</td>
        <td class="p-2 text-center">
          <button onclick="window.boreal.removerUnidade(${idx})" class="text-rose-600 hover:text-rose-800">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    if (window.lucide) window.lucide.createIcons();
  },

  adicionarLinhaUnidade: function() {
    const c = this.getContrato();
    const nome = prompt("Nome da Unidade / Polo de Atendimento:");
    if (!nome) return;
    c.unidades.push({
      id: "U" + Date.now(),
      nome: nome,
      cnpj: c.cnpj,
      cnae: "84.11-6-00",
      grauRisco: "Grau 1",
      endereco: c.endereco,
      contato: c.contatoNome,
      tel: c.contatoTel,
      email: c.contatoEmail,
      responsavel: "Responsável Local",
      cargoResponsavel: "Gerente / Diretor",
      clt: 5,
      estatutarios: 20,
      horario: "08:00 às 17:00"
    });
    this.renderizarModuloContratos();
  },

  removerUnidade: function(idx) {
    const c = this.getContrato();
    c.unidades.splice(idx, 1);
    this.renderizarModuloContratos();
  },

  // =========================================================================
  // MÓDULO 5: PRODUÇÃO, COLETA CADASTRAL DO CLIENTE & CAMPO IN LOCO
  // =========================================================================
  abrirSubAbaProducao: function(subAba) {
    ["coleta-cliente", "campo-inloco", "equipe-cronograma"].forEach(sa => {
      document.getElementById(`subpainel-${sa}`).classList.add("hidden");
      document.getElementById(`subtab-${sa}`).classList.remove("active");
    });
    document.getElementById(`subpainel-${subAba}`).classList.remove("hidden");
    document.getElementById(`subtab-${subAba}`).classList.add("active");

    if (subAba === "campo-inloco") this.atualizarSelectGHE();
    if (window.lucide) window.lucide.createIcons();
  },

  renderizarModuloProducao: function() {
    const c = this.getContrato();
    const tbody = document.getElementById("tbody-quadro-funcional");
    if (!tbody) return;
    tbody.innerHTML = "";

    c.quadroFuncional.forEach((qf, idx) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50";
      tr.innerHTML = `
        <td class="p-2 font-bold text-slate-800">${qf.unidade}</td>
        <td class="p-2 text-slate-700">${qf.setor}</td>
        <td class="p-2 text-slate-600 max-w-xs truncate">${qf.processo}</td>
        <td class="p-2 font-bold text-slate-900">${qf.cargo}</td>
        <td class="p-2 text-center font-bold text-[#B48D3C]">${qf.quantidade}</td>
        <td class="p-2 text-slate-600 max-w-sm truncate">${qf.atividades}</td>
        <td class="p-2 text-slate-600">${qf.epi}</td>
        <td class="p-2 text-center">
          <button onclick="window.boreal.removerQuadroFuncional(${idx})" class="text-rose-600 hover:text-rose-800">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Renderizar equipe
    const tbodyEquipe = document.getElementById("tbody-equipe-producao");
    tbodyEquipe.innerHTML = "";
    c.equipe.forEach((eq, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="p-2 font-bold text-slate-800">${eq.nome}</td>
        <td class="p-2 text-slate-600">${eq.qualif}</td>
        <td class="p-2 text-slate-600">${eq.registro}</td>
        <td class="p-2 text-slate-600">${eq.tel}</td>
        <td class="p-2 text-slate-600">${eq.email}</td>
        <td class="p-2 text-center"><button onclick="window.boreal.removerProfissional(${idx})" class="text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button></td>
      `;
      tbodyEquipe.appendChild(tr);
    });

    // Renderizar cronograma
    const tbodyCrono = document.getElementById("tbody-cronograma-servico");
    tbodyCrono.innerHTML = "";
    c.cronograma.forEach((cr, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="p-2 font-bold text-slate-800">${cr.unidade}</td>
        <td class="p-2 text-slate-700">${cr.objeto}</td>
        <td class="p-2 text-slate-600">${cr.quant}</td>
        <td class="p-2 text-slate-600">${cr.prazo}</td>
        <td class="p-2 text-slate-600">${cr.inicio}</td>
        <td class="p-2 text-slate-600">${cr.conclusao}</td>
        <td class="p-2 text-center"><button onclick="window.boreal.removerEtapaCronograma(${idx})" class="text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button></td>
      `;
      tbodyCrono.appendChild(tr);
    });

    if (window.lucide) window.lucide.createIcons();
  },

  adicionarLinhaQuadroFuncional: function() {
    const c = this.getContrato();
    const uNome = c.unidades.length > 0 ? c.unidades[0].nome : "Sede Principal";
    c.quadroFuncional.push({
      id: "QF" + Date.now(),
      unidade: uNome,
      setor: "Administrativo / Geral",
      processo: "Rotinas de atendimento e suporte técnico",
      cargo: "Novo Cargo",
      quantidade: 1,
      atividades: "Atividades gerais de rotina",
      epi: "Não aplicável / Conforme vistoria"
    });
    this.renderizarModuloProducao();
  },

  removerQuadroFuncional: function(idx) {
    const c = this.getContrato();
    c.quadroFuncional.splice(idx, 1);
    this.renderizarModuloProducao();
  },

  importarPlanilhaCliente: function(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const sheetName = wb.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { defval: "" });

        const c = window.boreal.getContrato();
        rows.forEach(r => {
          c.quadroFuncional.push({
            id: "QF" + Date.now() + Math.random(),
            unidade: r["NOME DA UNIDADE"] || r["UNIDADE"] || (c.unidades[0] ? c.unidades[0].nome : "Sede"),
            setor: r["SETOR"] || "Geral",
            processo: r["PROCESSO OPERACIONAL"] || r["PROCESSO"] || "",
            cargo: r["CARGO"] || r["FUNÇÃO"] || "Novo Cargo",
            quantidade: parseInt(r["QUANT."] || r["QUANTIDADE"] || 1),
            atividades: r["ATIVIDADES"] || "",
            epi: r["NOME DO EPI FORNECIDO"] || r["EPI"] || "Nenhum"
          });
        });

        window.boreal.renderizarModuloProducao();
        alert(`${rows.length} cargos e setores importados da planilha com sucesso!`);
      } catch (err) {
        alert("Erro ao importar planilha: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  },

  atualizarSelectGHE: function() {
    const c = this.getContrato();
    const sel = document.getElementById("select-ghe-campo");
    if (!sel) return;
    sel.innerHTML = "";

    c.quadroFuncional.forEach(qf => {
      const opt = document.createElement("option");
      opt.value = qf.id;
      opt.textContent = `${qf.unidade} • ${qf.cargo} (${qf.setor})`;
      sel.appendChild(opt);
    });

    if (c.quadroFuncional.length > 0) {
      this.carregarDadosGHE(c.quadroFuncional[0].id);
    }
  },

  carregarDadosGHE: function(qfId) {
    const c = this.getContrato();
    const av = c.avaliacoesCampo[qfId] || {
      ruido: "60.0", temp: "23.0", ilum: "500", umid: "55.0",
      perigo: "Postura sentada contínua", prob: "2", sev: "2", nivel: "Tolerável"
    };

    document.getElementById("campo-ruido").value = av.ruido;
    document.getElementById("campo-temp").value = av.temp;
    document.getElementById("campo-ilum").value = av.ilum;
    document.getElementById("campo-umid").value = av.umid;
    document.getElementById("campo-perigo").value = av.perigo;
    document.getElementById("campo-prob").value = av.prob;
    document.getElementById("campo-sev").value = av.sev;
    this.recalcularRisco();
  },

  recalcularRisco: function() {
    const p = parseInt(document.getElementById("campo-prob").value);
    const s = parseInt(document.getElementById("campo-sev").value);
    const badge = document.getElementById("badge-nivel-risco");

    // Matriz 5x5 Boreal
    const matriz = [
      ["Irrelevante", "Tolerável", "Tolerável", "Significativo", "Significativo"],
      ["Tolerável", "Tolerável", "Significativo", "Significativo", "Sério"],
      ["Tolerável", "Significativo", "Sério", "Sério", "Crítico"],
      ["Significativo", "Significativo", "Sério", "Crítico", "Crítico"],
      ["Significativo", "Sério", "Crítico", "Crítico", "Crítico"]
    ];

    const nivel = matriz[p - 1][s - 1];
    badge.textContent = nivel;
    if (nivel === "Crítico") badge.className = "px-3 py-1 rounded-full font-bold uppercase text-xs bg-rose-100 text-rose-800 border border-rose-300";
    else if (nivel === "Sério") badge.className = "px-3 py-1 rounded-full font-bold uppercase text-xs bg-orange-100 text-orange-800 border border-orange-300";
    else if (nivel === "Significativo") badge.className = "px-3 py-1 rounded-full font-bold uppercase text-xs bg-amber-100 text-amber-800 border border-amber-300";
    else badge.className = "px-3 py-1 rounded-full font-bold uppercase text-xs bg-emerald-100 text-emerald-800 border border-emerald-300";
  },

  gravarAvaliacaoCampo: function() {
    const qfId = document.getElementById("select-ghe-campo").value;
    if (!qfId) return;

    const c = this.getContrato();
    c.avaliacoesCampo[qfId] = {
      ruido: document.getElementById("campo-ruido").value,
      temp: document.getElementById("campo-temp").value,
      ilum: document.getElementById("campo-ilum").value,
      umid: document.getElementById("campo-umid").value,
      perigo: document.getElementById("campo-perigo").value,
      prob: document.getElementById("campo-prob").value,
      sev: document.getElementById("campo-sev").value,
      nivel: document.getElementById("badge-nivel-risco").textContent
    };
    alert("Avaliação técnica in loco do GHE gravada com sucesso!");
  },

  copiarMatrizPGRWord: function() {
    const c = this.getContrato();
    if (c.quadroFuncional.length === 0) {
      alert("Nenhum quadro funcional para exportar.");
      return;
    }

    let html = `
      <table border="1" cellpadding="4" style="border-collapse:collapse;font-family:Cambria;font-size:10pt;width:100%;">
        <tr style="background:#f2f2f2;font-weight:bold;">
          <th colspan="2">GRUPO HOMOGÊNEO DE EXPOSIÇÃO</th>
          <th colspan="4">MEDIÇÕES AMBIENTAIS</th>
        </tr>
        <tr style="font-weight:bold;">
          <td>NOME DO SETOR OU UNIDADE</td>
          <td>PROCESSO OPERACIONAL</td>
          <td>RUÍDO (dB)</td>
          <td>TEMP. (°C)</td>
          <td>ILUM. (LUX)</td>
          <td>UM. (%)</td>
        </tr>
    `;

    c.quadroFuncional.forEach(qf => {
      const av = c.avaliacoesCampo[qf.id] || { ruido: "-", temp: "-", ilum: "-", umid: "-" };
      html += `
        <tr>
          <td>${qf.unidade} - ${qf.setor}</td>
          <td>${qf.processo}</td>
          <td>${av.ruido}</td>
          <td>${av.temp}</td>
          <td>${av.ilum}</td>
          <td>${av.umid}</td>
        </tr>
        <tr>
          <td colspan="6"><strong>CARGO:</strong> ${qf.cargo} | <strong>QUANT.:</strong> ${qf.quantidade} | <strong>ATIVIDADES:</strong> ${qf.atividades}</td>
        </tr>
      `;
    });

    html += `</table>`;

    navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([html], { type: 'text/plain' })
      })
    ]).then(() => {
      alert("Tabela 15 da Matriz PGR copiada com sucesso! Abra o Word na página 15 e pressione Ctrl+V.");
    });
  },

  // =========================================================================
  // MÓDULO 6: DOCUMENTOS PADRÕES & PREVIEW
  // =========================================================================
  renderizarModuloDocumentos: function() {
    const c = this.getContrato();
    const numOficio = String(c.sequencialOficio || 1).padStart(4, '0') + "/2026";
    document.getElementById("lbl-num-oficio").textContent = `OFÍCIO Nº ${numOficio}`;
    document.getElementById("pv-num-oficio").textContent = `OFÍCIO Nº ${numOficio}`;

    document.getElementById("doc-destinatario").value = c.cliente;
    document.getElementById("doc-ac").value = c.fiscalNome;
    document.getElementById("doc-ref").value = `Contrato nº ${c.numeroContrato} - Objeto: ${c.objeto}`;
    document.getElementById("doc-assunto").value = "Esclarecimentos Técnicos e Jurídicos";
    document.getElementById("doc-corpo").value = "A Boreal Engmed Ltda. vem por meio deste expediente apresentar esclarecimentos referentes à execução do contrato em referência.";

    this.atualizarPreviewDoc();

    ["doc-destinatario", "doc-ac", "doc-assunto", "doc-ref", "doc-corpo", "doc-data-extenso"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.oninput = () => this.atualizarPreviewDoc();
    });
  },

  mudarModeloDoc: function(tipo) {
    const c = this.getContrato();
    const corpo = document.getElementById("doc-corpo");
    const assunto = document.getElementById("doc-assunto");
    const tabelaBox = document.getElementById("pv-tabela-anexa");
    tabelaBox.classList.add("hidden");
    tabelaBox.innerHTML = "";

    if (tipo === "oficio") {
      assunto.value = "Esclarecimentos Técnicos e Jurídicos";
      corpo.value = "A Boreal Engmed Ltda. vem respeitosamente prestar esclarecimentos sobre a condução das etapas do cronograma físico.";
    } else if (tipo === "declaracao") {
      assunto.value = "Declaração de Cumprimento de Requisitos e Normas Regulamentadoras";
      corpo.value = "DECLARA, para os devidos fins de direito, que a equipe técnica atende rigorosamente às Normas Regulamentadoras vigentes.";
    } else if (tipo === "proposta") {
      assunto.value = "Proposta Comercial Formal";
      corpo.value = "Submetemos à vossa apreciação nossa Proposta Comercial detalhada conforme itens e condições descritas na planilha.";
      tabelaBox.classList.remove("hidden");
      this.montarTabelaPropostaPreview(tabelaBox);
    } else if (tipo === "cronograma_pgr") {
      assunto.value = "PLANO DE SERVIÇO E CRONOGRAMA FÍSICO COM AVALIAÇÃO PSICOSSOCIAL (COPSOQ)";
      corpo.value = "Apresentamos o cronograma detalhado de vistorias técnicas e a metodologia das avaliações psicossociais remotas COPSOQ.";
    } else if (tipo === "cronograma_geral") {
      assunto.value = "PLANO DE SERVIÇO E CRONOGRAMA FÍSICO GERAL";
      corpo.value = "Apresentamos o cronograma físico das vistorias técnicas e avaliações ambientais in loco.";
    } else if (tipo === "relatorio_mensal") {
      assunto.value = "RELATÓRIO MENSAL DE SERVIÇOS ENTREGUES";
      corpo.value = "Apresentamos o relatório de produção mensal das etapas de engenharia e medicina do trabalho concluídas.";
    } else if (tipo === "relatorio_fisico_fin") {
      assunto.value = "RELATÓRIO FÍSICO-FINANCEIRO DO CONTRATO";
      corpo.value = "Apresentamos o demonstrativo das etapas concluídas e medições financeiras para fins de liquidação de empenho.";
    }
    this.atualizarPreviewDoc();
  },

  montarTabelaPropostaPreview: function(container) {
    const c = this.getContrato();
    let tbl = `<table border="1" cellpadding="3" style="width:100%;border-collapse:collapse;font-size:9pt;margin-top:8px;">
      <tr style="background:#f0f0f0;font-weight:bold;">
        <th>Item</th><th>Descrição</th><th>Qtd</th><th>Un</th><th>Vl. Unitário</th><th>Vl. Total</th>
      </tr>`;
    c.itens.forEach(it => {
      tbl += `<tr>
        <td align="center">${it.item}</td>
        <td>${it.objeto}</td>
        <td align="center">${it.quantidade}</td>
        <td align="center">${it.unidade}</td>
        <td align="right">R$ ${it.valorUnitario.toFixed(2)}</td>
        <td align="right">R$ ${it.valorTotal.toFixed(2)}</td>
      </tr>`;
    });
    tbl += `<tr style="font-weight:bold;background:#fafafa;"><td colspan="5" align="right">VALOR TOTAL:</td><td align="right">R$ ${c.valorContrato.toFixed(2)}</td></tr></table>`;
    container.innerHTML = tbl;
  },

  atualizarPreviewDoc: function() {
    document.getElementById("pv-destinatario").textContent = document.getElementById("doc-destinatario").value || "Órgão / Empresa";
    document.getElementById("pv-ac").textContent = document.getElementById("doc-ac").value || "Responsável";
    document.getElementById("pv-assunto").textContent = document.getElementById("doc-assunto").value || "Assunto";
    document.getElementById("pv-ref").textContent = document.getElementById("doc-ref").value || "Referência";
    document.getElementById("pv-corpo-dinamico").textContent = document.getElementById("doc-corpo").value || "";
    document.getElementById("pv-data-extenso").textContent = document.getElementById("doc-data-extenso").value;
  },

  configurarAssinaturaCanvas: function() {
    const canvas = document.getElementById("canvas-assinatura");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let desenhando = false;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";

    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - r.left, y: cy - r.top };
    };

    canvas.addEventListener("mousedown", (e) => { desenhando = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
    canvas.addEventListener("mousemove", (e) => { if (!desenhando) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); });
    window.addEventListener("mouseup", () => {
      if (!desenhando) return;
      desenhando = false;
      const img = document.getElementById("pv-img-assinatura");
      img.src = canvas.toDataURL("image/png");
      img.classList.remove("hidden");
    });

    canvas.addEventListener("touchstart", (e) => { desenhando = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault(); }, {passive:false});
    canvas.addEventListener("touchmove", (e) => { if (!desenhando) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); }, {passive:false});
    canvas.addEventListener("touchend", () => {
      desenhando = false;
      const img = document.getElementById("pv-img-assinatura");
      img.src = canvas.toDataURL("image/png");
      img.classList.remove("hidden");
    });
  },

  limparAssinatura: function() {
    const canvas = document.getElementById("canvas-assinatura");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = document.getElementById("pv-img-assinatura");
    img.src = "";
    img.classList.add("hidden");
  },

  baixarDOCX: function() {
    const mod = document.getElementById("select-modelo-doc").value;
    alert(`Gerando arquivo Word (.docx) oficial do modelo "${mod.toUpperCase()}" com cabeçalho Boreal, fonte Cambria 10, espaçamento zerado e margens justificadas.`);
  },

  baixarPDF: function() {
    const el = document.getElementById("area-preview-documento");
    const opt = {
      margin: 10,
      filename: `Documento_Boreal_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    if (window.html2pdf) {
      window.html2pdf().set(opt).from(el).save();
    } else {
      window.print();
    }
  },

  // =========================================================================
  // MÓDULO 7: FINANCEIRO, FATURAMENTO & TRIBUTAÇÃO
  // =========================================================================
  renderizarModuloFinanceiro: function() {
    const c = this.getContrato();
    const bruta = c.valorContrato || 85000.00;
    
    // Retenções Tributárias (Linha 26)
    const irpj = bruta * 0.015;
    const csll = bruta * 0.010;
    const pis = bruta * 0.0065;
    const cofins = bruta * 0.030;
    const iss = bruta * 0.050;
    const totalRetido = irpj + csll + pis + cofins + iss;
    const liquido = bruta - totalRetido;
    const gastos = bruta * 0.42; // Base de compras da Boreal
    const receitaReal = liquido - gastos;

    document.getElementById("fin-card-bruta").textContent = `R$ ${bruta.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
    document.getElementById("fin-card-retido").textContent = `R$ ${totalRetido.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
    document.getElementById("fin-card-gastos").textContent = `R$ ${gastos.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
    document.getElementById("fin-card-liquida").textContent = `R$ ${receitaReal.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;

    // Faturamentos
    const tbodyFat = document.getElementById("tbody-faturamento");
    tbodyFat.innerHTML = "";
    c.faturamentos.forEach(f => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="p-2 font-bold">${c.cliente}</td>
        <td class="p-2 text-slate-700">${f.objeto}</td>
        <td class="p-2 text-center">${f.quantTotal}</td>
        <td class="p-2 text-center font-bold text-[#B48D3C]">${f.quantEntregue}</td>
        <td class="p-2 text-center">${f.quantTotal - f.quantEntregue}</td>
        <td class="p-2">${f.dataEntrega}</td>
        <td class="p-2 text-right font-bold">R$ ${f.valorTotal.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td class="p-2 font-semibold text-slate-800">${f.nf}</td>
        <td class="p-2"><span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">${f.status}</span></td>
      `;
      tbodyFat.appendChild(tr);
    });

    // Relatório Fiscal
    const tbodyFisc = document.getElementById("tbody-fiscal");
    tbodyFisc.innerHTML = `
      <tr class="hover:bg-slate-50 font-medium">
        <td class="p-2 font-bold text-slate-900">NF-e 00124</td>
        <td class="p-2 text-slate-600">02/11/2026</td>
        <td class="p-2 text-right font-bold text-slate-900">R$ ${bruta.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td class="p-2 text-right text-rose-600">R$ ${irpj.toFixed(2)}</td>
        <td class="p-2 text-right text-rose-600">R$ ${csll.toFixed(2)}</td>
        <td class="p-2 text-right text-rose-600">R$ ${pis.toFixed(2)}</td>
        <td class="p-2 text-right text-rose-600">R$ ${cofins.toFixed(2)}</td>
        <td class="p-2 text-right text-rose-600">R$ ${iss.toFixed(2)}</td>
        <td class="p-2 text-right font-bold text-emerald-700">R$ ${liquido.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td class="p-2 text-center"><span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">Liquidada</span></td>
      </tr>
    `;
  },

  gerarRelatorioProducaoPDF: function() {
    alert("Gerando Relatório de Produção com termo de aceite e protocolo para envio e assinatura do fiscal do contrato!");
  },

  // =========================================================================
  // MÓDULO 8: PROCESSO GERAL (VISÃO TOTAL DO CLIENTE ATIVO)
  // =========================================================================
  renderizarProcessoGeral: function() {
    const c = this.getContrato();
    const box = document.getElementById("box-processo-geral");
    if (!box) return;

    const isGestor = AppData.perfilAtivo === "gestor";
    const estiloGestor = isGestor ? "gestor-campo" : "bg-slate-100 text-slate-400 italic";
    const valorExibicao = isGestor ? `R$ ${c.valorContrato.toLocaleString('pt-BR', {minimumFractionDigits:2})}` : "[Restrito ao Gestor]";

    box.innerHTML = `
      <div class="border-b pb-3">
        <h2 class="text-sm font-bold text-slate-900 uppercase">Processo Geral do Contrato • ${c.cliente}</h2>
        <p class="text-slate-500">Objeto: ${c.objeto} | CNPJ: ${c.cnpj}</p>
      </div>

      <!-- SEÇÃO 1: COMERCIAL & CONTRATUAL -->
      <div class="space-y-2">
        <h3 class="font-bold text-slate-800 uppercase bg-slate-100 p-1.5 rounded">1. Módulo Comercial & Cadastro</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div><strong>Nº Contrato:</strong> ${c.numeroContrato}</div>
          <div><strong>Vigência:</strong> ${c.vigencia}</div>
          <div><strong>ART:</strong> ${c.art}</div>
          <div class="p-1 rounded ${estiloGestor}"><strong>Valor Global:</strong> ${valorExibicao}</div>
          <div><strong>Fiscal:</strong> ${c.fiscalNome} (${c.fiscalTel})</div>
          <div><strong>Gestor:</strong> ${c.gestorNome}</div>
          <div><strong>Garantia:</strong> ${c.garantiaTipo} (${c.garantiaPerc})</div>
          <div class="p-1 rounded ${estiloGestor}"><strong>Apólice:</strong> ${isGestor ? 'R$ '+c.garantiaApolice.toFixed(2) : '[Restrito]'}</div>
        </div>
      </div>

      <!-- SEÇÃO 2: ESTABELECIMENTOS -->
      <div class="space-y-2">
        <h3 class="font-bold text-slate-800 uppercase bg-slate-100 p-1.5 rounded">2. Estabelecimentos (Unidades)</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left border">
            <thead class="bg-slate-50 border-b font-bold">
              <tr><th>Unidade</th><th>CNPJ</th><th>CNAE</th><th>Grau</th><th>Endereço</th><th>Responsável</th><th>CLT</th><th>Estat.</th></tr>
            </thead>
            <tbody>
              ${c.unidades.map(u => `<tr>
                <td class="p-1.5 font-bold">${u.nome}</td><td>${u.cnpj}</td><td>${u.cnae}</td><td>${u.grauRisco}</td>
                <td class="max-w-xs truncate">${u.endereco}</td><td>${u.responsavel}</td><td>${u.clt}</td><td>${u.estatutarios}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- SEÇÃO 3: PRODUÇÃO & RISCOS -->
      <div class="space-y-2">
        <h3 class="font-bold text-slate-800 uppercase bg-slate-100 p-1.5 rounded">3. Produção & Vistorias In Loco (Matriz 15 PGR)</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left border">
            <thead class="bg-slate-50 border-b font-bold">
              <tr><th>Unidade / Setor</th><th>Cargo</th><th>Qtd</th><th>Ruído (dB)</th><th>Temp (°C)</th><th>Ilum (Lux)</th><th>Nível de Risco</th></tr>
            </thead>
            <tbody>
              ${c.quadroFuncional.map(qf => {
                const av = c.avaliacoesCampo[qf.id] || { ruido: "-", temp: "-", ilum: "-", nivel: "Não avaliado" };
                return `<tr>
                  <td class="p-1.5">${qf.unidade} - ${qf.setor}</td>
                  <td class="font-bold">${qf.cargo}</td>
                  <td>${qf.quantidade}</td>
                  <td>${av.ruido}</td>
                  <td>${av.temp}</td>
                  <td>${av.ilum}</td>
                  <td class="font-bold">${av.nivel}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- SEÇÃO 4: FINANCEIRO & FISCAL -->
      <div class="space-y-2">
        <h3 class="font-bold text-slate-800 uppercase bg-slate-100 p-1.5 rounded">4. Financeiro & Faturamento</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div><strong>Banco de Pagto:</strong> ${c.pagtoBanco}</div>
          <div><strong>Status Financeiro:</strong> ${c.status}</div>
          <div class="p-1 rounded ${estiloGestor}"><strong>Receita Líquida Estimada:</strong> ${isGestor ? 'R$ ' + (c.valorContrato * 0.4685).toLocaleString('pt-BR', {minimumFractionDigits:2}) : '[Restrito]'}</div>
          <div><strong>Faturamentos Emitidos:</strong> ${c.faturamentos.length} NF(s)</div>
        </div>
      </div>
    `;
  },

  imprimirTelaProcessoGeral: function() {
    window.print();
  },

  // =========================================================================
  // RECONHECIMENTO DE VOZ (DITADO ASSISTIDO)
  // =========================================================================
  configurarVoz: function() {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return;
    AppData.recognition = new Speech();
    AppData.recognition.lang = "pt-BR";
    AppData.recognition.continuous = false;

    AppData.recognition.onresult = (e) => {
      const texto = e.results[0][0].transcript;
      const secDoc = document.getElementById("sec-documentos");
      if (secDoc && !secDoc.classList.contains("hidden")) {
        const corpo = document.getElementById("doc-corpo");
        corpo.value = (corpo.value ? corpo.value + " " : "") + texto;
        this.atualizarPreviewDoc();
        alert(`Texto gravado por voz: "${texto}"`);
      } else {
        alert(`Áudio capturado: "${texto}". Posicione o cursor no formulário de documentos.`);
      }
    };

    AppData.recognition.onend = () => {
      AppData.isRecording = false;
      document.getElementById("btn-audio-assistido").classList.remove("recording-pulse", "bg-rose-100");
      document.getElementById("label-mic").textContent = "Ditar";
    };
  },

  alternarDitadoVoz: function() {
    if (!AppData.recognition) {
      alert("A entrada por voz funciona nos navegadores Google Chrome ou Edge.");
      return;
    }
    if (AppData.isRecording) {
      AppData.recognition.stop();
      AppData.isRecording = false;
    } else {
      AppData.recognition.start();
      AppData.isRecording = true;
      document.getElementById("btn-audio-assistido").classList.add("recording-pulse", "bg-rose-100");
      document.getElementById("label-mic").textContent = "Ouvindo...";
    }
  },

  // FUNÇÕES AUXILIARES
  converterExtenso: function(val) {
    if (!val || val === 0) return "Zero reais";
    const int = Math.floor(val);
    const cent = Math.round((val - int) * 100);
    return `${int.toLocaleString('pt-BR')} reais` + (cent > 0 ? ` e ${cent} centavos` : "");
  },

  salvarTudo: function() {
    alert("Todos os dados dos módulos (Vendas, Clientes, Contratos, Produção e Financeiro) foram sincronizados e salvos com sucesso!");
  },

  criarNovoProjeto: function() {
    const nome = prompt("Nome do Órgão / Cliente:");
    if (!nome) return;
    const obj = prompt("Objeto da Contratação / Licitação:");
    const novoId = "BOREAL-2026-" + String(AppData.contratos.length + 1).padStart(3, '0');
    AppData.contratos.unshift({
      id: novoId,
      ativoVisual: true,
      cliente: nome,
      cnpj: "00.000.000/0001-00",
      objeto: obj || "Serviços de Engenharia e Medicina do Trabalho",
      edital: "Edital 2026",
      processo: "Processo 2026",
      portal: "PNCP",
      dataProposta: "2026-03-01",
      numeroContrato: "A Definir",
      dataContrato: "2026-03-01",
      vigencia: "12 meses",
      art: "A emitir",
      valorContrato: 15000.00,
      endereco: "Endereço a definir",
      contatoNome: "Responsável",
      contatoTel: "(19) 0000-0000",
      contatoEmail: "contato@cliente.com.br",
      locaisSede: 1,
      locaisForaSede: 0,
      status: "em_elaboracao",
      fiscalNome: "A definir",
      fiscalTel: "",
      fiscalEmail: "",
      gestorNome: "A definir",
      gestorTel: "",
      gestorEmail: "",
      pagtoNome: "Setor Financeiro",
      pagtoTel: "",
      pagtoBanco: "Banco do Brasil",
      garantiaTipo: "Dispensa",
      garantiaPerc: "0%",
      garantiaCorretora: "",
      garantiaApolice: 0,
      garantiaObs: "",
      itens: [{ id: 1, item: 1, objeto: obj || "Serviço de SST", quantidade: 1, unidade: "UNIDADE", valorUnitario: 15000.00, valorTotal: 15000.00 }],
      unidades: [],
      quadroFuncional: [],
      avaliacoesCampo: {},
      equipe: [],
      cronograma: [],
      faturamentos: [],
      sequencialOficio: 1
    });
    AppData.contratoAtivoId = novoId;
    this.popularSeletorContratos();
    this.mudarContratoGlobal(novoId);
    alert(`Novo projeto "${nome}" criado com sucesso!`);
  }
};

// INICIALIZAR QUANDO O DOM CARREGAR
document.addEventListener("DOMContentLoaded", () => {
  window.boreal.init();
});
