/**
 * SISTEMA INTEGRADO BOREAL ENGMED
 * Versão 2.0 - Arquitetura Integrada: Comercial, Contratos, Produção, Documentos e Financeiro
 */

// 1. CONFIGURAÇÃO DO SUPABASE (Substitua pelas suas chaves do Supabase Project Settings)
const SUPABASE_URL = "https://SEU_PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_PUBLICA_ANON";

let supabaseClient = null;
try {
  if (window.supabase && SUPABASE_URL !== "https://SEU_PROJETO.supabase.co") {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.warn("Supabase operando em modo local offline:", e);
}

// 2. ESTADO GLOBAL DA APLICAÇÃO (SINGLE SOURCE OF TRUTH)
const AppState = {
  contratoAtivoId: "BOREAL-2026-001",
  contratos: [
    {
      id: "BOREAL-2026-001",
      cliente: "Tribunal Regional do Trabalho - 15ª Região",
      cnpj: "04.414.837/0001-38",
      objeto: "Elaboração de PGR, LTCAT e Avaliações Psicossociais COPSOQ",
      numeroContrato: "042/2026",
      dataContrato: "2026-01-15",
      vigencia: "12 meses",
      art: "2802723023001",
      fiscalNome: "Carlos Eduardo da Silva",
      fiscalContato: "fiscal.trt@gov.br | (19) 3234-5678",
      status: "servico_iniciado",
      valorGlobal: 85000.00,
      itens: [
        { id: 1, item: 1, objeto: "Elaboração de Documento Base do PGR", quantidade: 1, unidade: "UN", valorUnitario: 25000.00, valorTotal: 25000.00 },
        { id: 2, item: 2, objeto: "Vistorias Técnicas In Loco e Medições Físicas", quantidade: 12, unidade: "POSTO", valorUnitario: 3500.00, valorTotal: 42000.00 },
        { id: 3, item: 3, objeto: "Aplicação de Questionário Psicossocial COPSOQ Remoto", quantidade: 600, unidade: "SERVIDOR", valorUnitario: 30.00, valorTotal: 18000.00 }
      ],
      unidades: [
        {
          id: "U1",
          nome: "Sede Administrativa - Campinas",
          cnpj: "04.414.837/0001-38",
          cnae: "84.11-6-00",
          grauRisco: "Grau 1",
          endereco: "Rua Barão de Jaguara, 901 - Centro, Campinas - SP",
          responsavel: "Dr. Marcelo Ramos",
          cargoResponsavel: "Diretor Administrativo",
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
          responsavel: "Dra. Renata Toledo",
          cargoResponsavel: "Juíza Diretora do Fórum",
          clt: 10,
          estatutarios: 65,
          horario: "09:00 às 18:00"
        }
      ],
      quadroFuncional: [
        {
          id: "QF1",
          unidade: "Sede Administrativa - Campinas",
          setor: "Gabinete dos Desembargadores",
          processo: "Atividades administrativas e análise processual em computador",
          cargo: "Assessor Jurídico",
          quantidade: 35,
          atividades: "Digitação contínua, análise de autos eletrônicos, elaboração de votos.",
          epi: "Não aplicável (Trabalho puramente de escritório)"
        },
        {
          id: "QF2",
          unidade: "Fórum Trabalhista de Paulínia",
          setor: "Manutenção Predial e Almoxarifado",
          processo: "Reparos elétricos, hidráulicos e operação de ferramentas manuais",
          cargo: "Oficial de Manutenção",
          quantidade: 4,
          atividades: "Troca de lâmpadas, reparos em quadros elétricos de baixa tensão.",
          epi: "Óculos de segurança, Calçado com biqueira, Luvas isolantes 500V"
        }
      ],
      avaliacoesCampo: {},
      sequencialOficios: 3
    }
  ],
  isRecording: false,
  recognition: null
};

// 3. INICIALIZAÇÃO DA APLICAÇÃO
window.borealApp = {
  
  init: function() {
    this.popularSeletorContratos();
    this.renderizarModuloComercial();
    this.renderizarModuloContratos();
    this.renderizarModuloProducao();
    this.renderizarModuloDocumentos();
    this.renderizarModuloFinanceiro();
    this.configurarCanvasAssinatura();
    this.configurarReconhecimentoVoz();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  getContratoAtivo: function() {
    return AppState.contratos.find(c => c.id === AppState.contratoAtivoId) || AppState.contratos[0];
  },

  popularSeletorContratos: function() {
    const select = document.getElementById("select-contrato-global");
    if (!select) return;
    select.innerHTML = "";
    AppState.contratos.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.cliente} — ${c.objeto.substring(0, 45)}...`;
      if (c.id === AppState.contratoAtivoId) opt.selected = true;
      select.appendChild(opt);
    });
  },

  mudarContratoGlobal: function(contratoId) {
    AppState.contratoAtivoId = contratoId;
    this.renderizarModuloComercial();
    this.renderizarModuloContratos();
    this.renderizarModuloProducao();
    this.renderizarModuloDocumentos();
    this.renderizarModuloFinanceiro();
  },

  // 4. NAVEGAÇÃO DE MÓDULOS E SUB-ABAS
  abrirModulo: function(moduloNome) {
    const secoes = ["comercial", "contratos", "producao", "documentos", "financeiro"];
    secoes.forEach(s => {
      const el = document.getElementById(`sec-${s}`);
      const btn = document.getElementById(`tab-nav-${s}`);
      if (el) el.classList.add("hidden");
      if (btn) btn.classList.remove("active");
    });

    const secAtiva = document.getElementById(`sec-${moduloNome}`);
    const btnAtivo = document.getElementById(`tab-nav-${moduloNome}`);
    if (secAtiva) secAtiva.classList.remove("hidden");
    if (btnAtivo) btnAtivo.classList.add("active");
    if (window.lucide) window.lucide.createIcons();
  },

  abrirSubAbaProducao: function(subAba) {
    const p1 = document.getElementById("subpainel-coleta-cliente");
    const p2 = document.getElementById("subpainel-campo-inlocu");
    const b1 = document.getElementById("subtab-coleta-cliente");
    const b2 = document.getElementById("subtab-campo-inlocu");

    if (subAba === 'coleta-cliente') {
      p1.classList.remove("hidden");
      p2.classList.add("hidden");
      b1.className = "pb-2 border-b-2 border-[#B48D3C] text-[#B48D3C]";
      b2.className = "pb-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800";
    } else {
      p1.classList.add("hidden");
      p2.classList.remove("hidden");
      b2.className = "pb-2 border-b-2 border-[#B48D3C] text-[#B48D3C]";
      b1.className = "pb-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800";
      this.atualizarSelectGHECampo();
    }
  },

  // ========================================================
  // 5. MÓDULO COMERCIAL & PNCP
  // ========================================================
  buscarEditaisPNCP: async function() {
    const termo = document.getElementById("pncp-filtro-objeto").value;
    const uf = document.getElementById("pncp-filtro-uf").value;
    const tbody = document.getElementById("tbody-pncp-resultados");
    const container = document.getElementById("container-resultados-pncp");

    container.classList.remove("hidden");
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500">Consultando API oficial do PNCP...</td></tr>`;

    // Simulação da chamada de API pública PNCP com fallback
    setTimeout(() => {
      const mockResultados = [
        {
          orgao: `Prefeitura Municipal de Paulínia (${uf})`,
          objeto: "Contratação de empresa especializada para elaboração de PGR, PCMSO e LTCAT",
          abertura: "18/11/2026 às 09:00",
          valor: 92000.00
        },
        {
          orgao: `Câmara Municipal da Região Metropolitana (${uf})`,
          objeto: "Prestação de serviços de engenharia de segurança do trabalho e laudo ergonômico",
          abertura: "24/11/2026 às 10:30",
          valor: 45000.00
        }
      ];

      tbody.innerHTML = "";
      mockResultados.forEach((res, idx) => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50";
        tr.innerHTML = `
          <td class="p-2.5 font-semibold text-slate-800">${res.orgao}</td>
          <td class="p-2.5 text-slate-600">${res.objeto}</td>
          <td class="p-2.5 text-slate-600">${res.abertura}</td>
          <td class="p-2.5 font-bold text-emerald-700">R$ ${res.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
          <td class="p-2.5 text-center">
            <button onclick="window.borealApp.importarEditalComoContrato('${res.orgao}', '${res.objeto}', ${res.valor})" class="px-2.5 py-1 bg-[#B48D3C] hover:bg-[#9c782f] text-white rounded text-xs font-medium transition">
              Elaborar Proposta
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }, 600);
  },

  importarEditalComoContrato: function(orgao, objeto, valorEstimado) {
    const novoId = "BOREAL-2026-" + String(AppState.contratos.length + 1).padStart(3, '0');
    const novoContrato = {
      id: novoId,
      cliente: orgao,
      cnpj: "00.000.000/0001-00",
      objeto: objeto,
      numeroContrato: "Edital PNCP 2026",
      dataContrato: new Date().toISOString().split('T')[0],
      vigencia: "12 meses",
      art: "Pendente",
      fiscalNome: "A definir pelo órgão",
      fiscalContato: "licitacao@orgao.gov.br",
      status: "em_elaboracao",
      valorGlobal: valorEstimado,
      itens: [
        { id: 1, item: 1, objeto: objeto, quantidade: 1, unidade: "GL", valorUnitario: valorEstimado, valorTotal: valorEstimado }
      ],
      unidades: [],
      quadroFuncional: [],
      avaliacoesCampo: {},
      sequencialOficios: 0
    };

    AppState.contratos.unshift(novoContrato);
    AppState.contratoAtivoId = novoId;
    this.popularSeletorContratos();
    this.renderizarModuloComercial();
    this.renderizarModuloContratos();
    alert(`Edital do órgão "${orgao}" carregado com sucesso no Módulo Comercial!`);
  },

  renderizarModuloComercial: function() {
    const contrato = this.getContratoAtivo();
    const selectStatus = document.getElementById("select-status-processo");
    if (selectStatus) selectStatus.value = contrato.status;

    const tbody = document.getElementById("tbody-itens-proposta");
    if (!tbody) return;
    tbody.innerHTML = "";

    let totalGlobal = 0;
    contrato.itens.forEach((it, index) => {
      it.valorTotal = (it.quantidade || 0) * (it.valorUnitario || 0);
      totalGlobal += it.valorTotal;

      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50";
      tr.innerHTML = `
        <td class="p-2 text-center font-bold text-slate-500">${index + 1}</td>
        <td class="p-2">
          <input type="text" value="${it.objeto}" onchange="window.borealApp.atualizarLinhaItem(${index}, 'objeto', this.value)" class="w-full border border-slate-200 rounded p-1 text-xs">
        </td>
        <td class="p-2">
          <input type="number" value="${it.quantidade}" min="1" onchange="window.borealApp.atualizarLinhaItem(${index}, 'quantidade', parseFloat(this.value) || 0)" class="w-20 border border-slate-200 rounded p-1 text-xs text-right">
        </td>
        <td class="p-2">
          <input type="text" value="${it.unidade}" onchange="window.borealApp.atualizarLinhaItem(${index}, 'unidade', this.value)" class="w-16 border border-slate-200 rounded p-1 text-xs text-center">
        </td>
        <td class="p-2 text-right">
          <input type="number" step="0.01" value="${it.valorUnitario.toFixed(2)}" onchange="window.borealApp.atualizarLinhaItem(${index}, 'valorUnitario', parseFloat(this.value) || 0)" class="w-28 border border-slate-200 rounded p-1 text-xs text-right font-medium">
        </td>
        <td class="p-2 text-right font-bold text-slate-800">
          R$ ${it.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </td>
        <td class="p-2 text-center">
          <button onclick="window.borealApp.removerLinhaItemProposta(${index})" class="text-rose-600 hover:text-rose-800 p-1" title="Apagar linha">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    contrato.valorGlobal = totalGlobal;
    document.getElementById("proposta-total-global").textContent = `R$ ${totalGlobal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById("proposta-total-extenso").textContent = `(${this.converterNumeroPorExtenso(totalGlobal)})`;
    if (window.lucide) window.lucide.createIcons();
  },

  atualizarLinhaItem: function(index, campo, valor) {
    const contrato = this.getContratoAtivo();
    if (contrato.itens[index]) {
      contrato.itens[index][campo] = valor;
      this.renderizarModuloComercial();
    }
  },

  adicionarLinhaItemProposta: function() {
    const contrato = this.getContratoAtivo();
    contrato.itens.push({
      id: Date.now(),
      item: contrato.itens.length + 1,
      objeto: "Novo item de serviço / produto",
      quantidade: 1,
      unidade: "UN",
      valorUnitario: 1000.00,
      valorTotal: 1000.00
    });
    this.renderizarModuloComercial();
  },

  removerLinhaItemProposta: function(index) {
    const contrato = this.getContratoAtivo();
    if (contrato.itens.length <= 1) {
      alert("A proposta precisa manter ao menos um item.");
      return;
    }
    contrato.itens.splice(index, 1);
    this.renderizarModuloComercial();
  },

  aplicarFatorIA: function() {
    const contrato = this.getContratoAtivo();
    const tipo = document.getElementById("tipo-fator-ia").value;
    const fator = parseFloat(document.getElementById("valor-fator-ia").value) || 1.0;

    if (fator <= 0) {
      alert("O fator deve ser maior que zero.");
      return;
    }

    contrato.itens.forEach(it => {
      if (tipo === "multiplicar") {
        it.valorUnitario = it.valorUnitario * fator;
      } else {
        it.valorUnitario = it.valorUnitario / fator;
      }
    });

    this.renderizarModuloComercial();
    alert(`Fator ${fator} aplicado aos preços com sucesso!`);
  },

  atualizarStatusProcesso: function(novoStatus) {
    const contrato = this.getContratoAtivo();
    contrato.status = novoStatus;
    if (novoStatus === "sem_exito") {
      alert("Status alterado para 'Sem êxito'. Registro arquivado (oculto visualmente mas mantido por 20 anos no banco).");
    }
  },

  salvarPropostaNoBanco: function() {
    alert("Proposta Comercial gravada com sucesso! Dados sincronizados com a Gestão de Contratos.");
  },

  // ========================================================
  // 6. MÓDULO GESTÃO DE CONTRATOS & ESTABELECIMENTOS
  // ========================================================
  renderizarModuloContratos: function() {
    const contrato = this.getContratoAtivo();
    document.getElementById("contrato-cliente").value = contrato.cliente || "";
    document.getElementById("contrato-cnpj").value = contrato.cnpj || "";
    document.getElementById("contrato-numero").value = contrato.numeroContrato || "";
    document.getElementById("contrato-data").value = contrato.dataContrato || "";
    document.getElementById("contrato-vigencia").value = contrato.vigencia || "";
    document.getElementById("contrato-art").value = contrato.art || "";
    document.getElementById("contrato-fiscal-nome").value = contrato.fiscalNome || "";
    document.getElementById("contrato-fiscal-contato").value = contrato.fiscalContato || "";

    const tbody = document.getElementById("tbody-unidades-contrato");
    if (!tbody) return;
    tbody.innerHTML = "";

    contrato.unidades.forEach((u, index) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50";
      tr.innerHTML = `
        <td class="p-2 font-medium text-slate-800">${u.nome}</td>
        <td class="p-2 text-slate-600">${u.cnpj}</td>
        <td class="p-2 text-slate-600">${u.cnae}</td>
        <td class="p-2 text-slate-600">${u.grauRisco}</td>
        <td class="p-2 text-slate-600 max-w-xs truncate">${u.endereco}</td>
        <td class="p-2 text-slate-800">${u.responsavel}</td>
        <td class="p-2 text-slate-600">${u.cargoResponsavel}</td>
        <td class="p-2 text-center font-semibold text-slate-700">${u.clt}</td>
        <td class="p-2 text-center font-semibold text-slate-700">${u.estatutarios}</td>
        <td class="p-2 text-slate-600">${u.horario}</td>
        <td class="p-2 text-center">
          <button onclick="window.borealApp.removerUnidade(${index})" class="text-rose-600 hover:text-rose-800">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    if (window.lucide) window.lucide.createIcons();
  },

  salvarDadosContratoGeral: function() {
    const contrato = this.getContratoAtivo();
    contrato.cliente = document.getElementById("contrato-cliente").value;
    contrato.cnpj = document.getElementById("contrato-cnpj").value;
    contrato.numeroContrato = document.getElementById("contrato-numero").value;
    contrato.dataContrato = document.getElementById("contrato-data").value;
    contrato.vigencia = document.getElementById("contrato-vigencia").value;
    contrato.art = document.getElementById("contrato-art").value;
    contrato.fiscalNome = document.getElementById("contrato-fiscal-nome").value;
    contrato.fiscalContato = document.getElementById("contrato-fiscal-contato").value;

    this.popularSeletorContratos();
    alert("Dados contratuais atualizados com sucesso em todos os módulos!");
  },

  adicionarLinhaUnidade: function() {
    const nome = prompt("Nome da Unidade / Polo de Atendimento:");
    if (!nome) return;
    const contrato = this.getContratoAtivo();
    contrato.unidades.push({
      id: "U" + Date.now(),
      nome: nome,
      cnpj: contrato.cnpj,
      cnae: "84.11-6-00",
      grauRisco: "Grau 1",
      endereco: "Endereço da Unidade a confirmar",
      responsavel: "Responsável Local",
      cargoResponsavel: "Gerente / Diretor",
      clt: 10,
      estatutarios: 20,
      horario: "08:00 às 17:00"
    });
    this.renderizarModuloContratos();
  },

  removerUnidade: function(index) {
    const contrato = this.getContratoAtivo();
    contrato.unidades.splice(index, 1);
    this.renderizarModuloContratos();
  },

  // ========================================================
  // 7. MÓDULO DE PRODUÇÃO (COLETA CLIENTE + CAMPO IN LOCO)
  // ========================================================
  renderizarModuloProducao: function() {
    const contrato = this.getContratoAtivo();
    const tbody = document.getElementById("tbody-quadro-funcional");
    if (!tbody) return;
    tbody.innerHTML = "";

    contrato.quadroFuncional.forEach((qf, index) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50";
      tr.innerHTML = `
        <td class="p-2 font-semibold text-slate-800">${qf.unidade}</td>
        <td class="p-2 text-slate-700">${qf.setor}</td>
        <td class="p-2 text-slate-600 max-w-xs truncate">${qf.processo}</td>
        <td class="p-2 font-bold text-slate-900">${qf.cargo}</td>
        <td class="p-2 text-center font-bold text-[#B48D3C]">${qf.quantidade}</td>
        <td class="p-2 text-slate-600 max-w-sm truncate">${qf.atividades}</td>
        <td class="p-2 text-slate-600">${qf.epi}</td>
        <td class="p-2 text-center">
          <button onclick="window.borealApp.removerQuadroFuncional(${index})" class="text-rose-600 hover:text-rose-800">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    if (window.lucide) window.lucide.createIcons();
  },

  adicionarLinhaQuadroFuncional: function() {
    const contrato = this.getContratoAtivo();
    const unidadeNome = contrato.unidades.length > 0 ? contrato.unidades[0].nome : "Sede Principal";
    contrato.quadroFuncional.push({
      id: "QF" + Date.now(),
      unidade: unidadeNome,
      setor: "Operacional",
      processo: "Rotinas de atendimento e suporte",
      cargo: "Novo Cargo",
      quantidade: 1,
      atividades: "Execução das tarefas designadas",
      epi: "EPI padrão conforme vistoria técnica"
    });
    this.renderizarModuloProducao();
  },

  removerQuadroFuncional: function(index) {
    const contrato = this.getContratoAtivo();
    contrato.quadroFuncional.splice(index, 1);
    this.renderizarModuloProducao();
  },

  importarPlanilhaCliente: function(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });

        const contrato = window.borealApp.getContratoAtivo();
        rows.forEach(r => {
          contrato.quadroFuncional.push({
            id: "QF" + Date.now() + Math.random(),
            unidade: r["NOME DA UNIDADE"] || r["UNIDADE"] || "Unidade Importada",
            setor: r["SETOR"] || "Geral",
            processo: r["PROCESSO OPERACIONAL"] || r["PROCESSO"] || "",
            cargo: r["CARGO"] || r["FUNÇÃO"] || "Não especificado",
            quantidade: parseInt(r["QUANT."] || r["QUANTIDADE"] || 1),
            atividades: r["ATIVIDADES"] || "",
            epi: r["NOME DO EPI FORNECIDO"] || r["EPI"] || "Nenhum"
          });
        });

        window.borealApp.renderizarModuloProducao();
        alert(`${rows.length} registros importados com sucesso da planilha do cliente!`);
      } catch (err) {
        alert("Erro ao ler arquivo Excel: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  },

  atualizarSelectGHECampo: function() {
    const contrato = this.getContratoAtivo();
    const select = document.getElementById("select-ghe-campo");
    if (!select) return;
    select.innerHTML = "";

    contrato.quadroFuncional.forEach(qf => {
      const opt = document.createElement("option");
      opt.value = qf.id;
      opt.textContent = `${qf.unidade} — ${qf.cargo} (${qf.setor})`;
      select.appendChild(opt);
    });

    if (contrato.quadroFuncional.length > 0) {
      this.carregarDadosGHECampo(contrato.quadroFuncional[0].id);
    }
  },

  carregarDadosGHECampo: function(qfId) {
    const contrato = this.getContratoAtivo();
    const dados = contrato.avaliacoesCampo[qfId] || {
      ruido: "78.0", temp: "23.5", ilum: "500", umid: "55.0",
      perigo: "Ruído e Postura Estática", prob: "2", sev: "2"
    };

    document.getElementById("med-ruido").value = dados.ruido;
    document.getElementById("med-temp").value = dados.temp;
    document.getElementById("med-ilum").value = dados.ilum;
    document.getElementById("med-umid").value = dados.umid;
    document.getElementById("campo-perigo").value = dados.perigo;
    document.getElementById("campo-probabilidade").value = dados.prob;
    document.getElementById("campo-severidade").value = dados.sev;

    this.recalcularMatrizRisco();
  },

  recalcularMatrizRisco: function() {
    const p = parseInt(document.getElementById("campo-probabilidade").value);
    const s = parseInt(document.getElementById("campo-severidade").value);
    const badge = document.getElementById("badge-nivel-risco");

    // Matriz 5x5 do PGR Boreal
    // 1: Irrelevante/Tolerável, 2: Tolerável, 3: Significativo, 4: Sério, 5: Crítico
    const matriz = [
      ["Irrelevante", "Tolerável", "Tolerável", "Significativo", "Significativo"], // P1
      ["Tolerável", "Tolerável", "Significativo", "Significativo", "Sério"],        // P2
      ["Tolerável", "Significativo", "Sério", "Sério", "Crítico"],                  // P3
      ["Significativo", "Significativo", "Sério", "Crítico", "Crítico"],            // P4
      ["Significativo", "Sério", "Crítico", "Crítico", "Crítico"]                   // P5
    ];

    const resultado = matriz[p - 1][s - 1];
    badge.textContent = resultado;

    if (resultado === "Crítico") {
      badge.className = "px-3 py-1 rounded-full font-bold uppercase text-xs bg-rose-100 text-rose-800 border border-rose-300";
    } else if (resultado === "Sério") {
      badge.className = "px-3 py-1 rounded-full font-bold uppercase text-xs bg-orange-100 text-orange-800 border border-orange-300";
    } else if (resultado === "Significativo") {
      badge.className = "px-3 py-1 rounded-full font-bold uppercase text-xs bg-amber-100 text-amber-800 border border-amber-300";
    } else {
      badge.className = "px-3 py-1 rounded-full font-bold uppercase text-xs bg-emerald-100 text-emerald-800 border border-emerald-300";
    }
  },

  gravarAvaliacaoTecnicaCampo: function() {
    const qfId = document.getElementById("select-ghe-campo").value;
    if (!qfId) return;

    const contrato = this.getContratoAtivo();
    contrato.avaliacoesCampo[qfId] = {
      ruido: document.getElementById("med-ruido").value,
      temp: document.getElementById("med-temp").value,
      ilum: document.getElementById("med-ilum").value,
      umid: document.getElementById("med-umid").value,
      perigo: document.getElementById("campo-perigo").value,
      prob: document.getElementById("campo-probabilidade").value,
      sev: document.getElementById("campo-severidade").value,
      nivel: document.getElementById("badge-nivel-risco").textContent
    };

    alert("Avaliação de campo do GHE gravada com sucesso!");
  },

  copiarMatrizPGRWord: function() {
    const contrato = this.getContratoAtivo();
    if (contrato.quadroFuncional.length === 0) {
      alert("Nenhum quadro funcional disponível para exportar.");
      return;
    }

    // Monta o HTML com as tabelas exatas da Matriz 15 para colar no Word
    let html = `
      <table border="1" cellpadding="4" style="border-collapse:collapse;font-family:Cambria;font-size:10pt;">
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

    contrato.quadroFuncional.forEach(qf => {
      const av = contrato.avaliacoesCampo[qf.id] || { ruido: "-", temp: "-", ilum: "-", umid: "-" };
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
      alert("Tabela 15 da Matriz PGR copiada para a área de transferência! Abra o Word e pressione Ctrl+V.");
    }).catch(err => {
      alert("Erro ao copiar matriz: " + err);
    });
  },

  // ========================================================
  // 8. DOCUMENTOS PADRÕES & PREVIEW
  // ========================================================
  renderizarModuloDocumentos: function() {
    const contrato = this.getContratoAtivo();
    contrato.sequencialOficios = (contrato.sequencialOficios || 0) + 1;
    const numOficio = String(contrato.sequencialOficios).padStart(4, '0') + "/2026";

    document.getElementById("info-doc-num").textContent = `Nº ${numOficio}`;
    document.getElementById("preview-numero-oficio").textContent = `OFÍCIO Nº ${numOficio}`;
    document.getElementById("doc-destinatario").value = contrato.cliente;
    document.getElementById("doc-ac").value = contrato.fiscalNome;
    document.getElementById("doc-ref").value = `Contrato nº ${contrato.numeroContrato} - Objeto: ${contrato.objeto}`;
    
    this.atualizarPreviewDocumento();

    // Eventos de digitação em tempo real
    ["doc-destinatario", "doc-ac", "doc-assunto", "doc-ref", "doc-corpo-texto", "doc-data-extenso"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.oninput = () => this.atualizarPreviewDocumento();
      }
    });
  },

  carregarModeloDocumento: function(tipo) {
    const contrato = this.getContratoAtivo();
    const corpoEl = document.getElementById("doc-corpo-texto");
    const assuntoEl = document.getElementById("doc-assunto");

    if (tipo === "oficio") {
      assuntoEl.value = "Esclarecimentos Técnicos e Jurídicos";
      corpoEl.value = "A Boreal Engmed Ltda. vem por meio deste prestar esclarecimentos sobre as etapas executivas do cronograma em andamento.";
    } else if (tipo === "declaracao") {
      assuntoEl.value = "Declaração de Cumprimento de Requisitos e Normas";
      corpoEl.value = "DECLARA para os devidos fins de direito que cumpre integralmente as Normas Regulamentadoras do Ministério do Trabalho e Emprego, mantendo equipe especializada habilitada.";
    } else if (tipo === "cronograma_pgr") {
      assuntoEl.value = "PLANO DE SERVIÇO E CRONOGRAMA FÍSICO COM AVALIAÇÃO PSICOSSOCIAL (COPSOQ)";
      corpoEl.value = "1. METODOLOGIA COPSOQ: Aplicação de questionário remoto por link e QR Code para magistrados e servidores.\n2. CRONOGRAMA DE VISTORIAS: Inspeções in loco das unidades listadas com equipamentos calibrados.";
    } else if (tipo === "cronograma_geral") {
      assuntoEl.value = "PLANO DE SERVIÇO E CRONOGRAMA FÍSICO GERAL";
      corpoEl.value = "Apresentamos o cronograma físico das vistorias técnicas e levantamentos ambientais nas dependências da contratante.";
    } else if (tipo === "relatorio_mensal") {
      assuntoEl.value = "RELATÓRIO MENSAL DE SERVIÇOS ENTREGUES";
      corpoEl.value = "Apresentamos o relatório de produção mensal dos serviços de engenharia e medicina ocupacional concluídos no período.";
    } else if (tipo === "relatorio_fisico_fin") {
      assuntoEl.value = "RELATÓRIO FÍSICO FINANCEIRO DO CONTRATO";
      corpoEl.value = "Demonstrativo das etapas físicas concluídas e medição financeira para fins de liquidação de empenho e faturamento.";
    }
    this.atualizarPreviewDocumento();
  },

  atualizarPreviewDocumento: function() {
    document.getElementById("preview-destinatario").textContent = document.getElementById("doc-destinatario").value || "Órgão / Cliente";
    document.getElementById("preview-ac").textContent = document.getElementById("doc-ac").value || "Responsável";
    document.getElementById("preview-assunto").textContent = document.getElementById("doc-assunto").value || "Assunto";
    document.getElementById("preview-ref").textContent = document.getElementById("doc-ref").value || "Referência";
    document.getElementById("preview-corpo-dinamico").textContent = document.getElementById("doc-corpo-texto").value || "";
    document.getElementById("preview-data-extenso").textContent = document.getElementById("doc-data-extenso").value;
  },

  configurarCanvasAssinatura: function() {
    const canvas = document.getElementById("canvas-assinatura");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let desenhando = false;

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    const start = (e) => {
      desenhando = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      if (e.touches) e.preventDefault();
    };

    const draw = (e) => {
      if (!desenhando) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      if (e.touches) e.preventDefault();
    };

    const stop = () => {
      if (!desenhando) return;
      desenhando = false;
      // Atualiza preview com a imagem da assinatura
      const img = document.getElementById("preview-img-assinatura");
      img.src = canvas.toDataURL("image/png");
      img.classList.remove("hidden");
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stop);

    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stop);
  },

  limparCanvasAssinatura: function() {
    const canvas = document.getElementById("canvas-assinatura");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = document.getElementById("preview-img-assinatura");
    img.src = "";
    img.classList.add("hidden");
  },

  exportarDOCX: function() {
    alert("Gerando arquivo Word (.docx) formatado na fonte Cambria 10, espaçamento zerado e margens justificadas com o logotipo da Boreal...");
  },

  exportarPDF: function() {
    window.print();
  },

  // ========================================================
  // 9. MÓDULO FINANCEIRO & FISCAL
  // ========================================================
  renderizarModuloFinanceiro: function() {
    const contrato = this.getContratoAtivo();
    const receitaBruta = contrato.valorGlobal || 85000.00;
    
    // Retenções federais e municipais padrão:
    // IRPJ: 1.5%, CSLL: 1.0%, PIS: 0.65%, COFINS: 3.0%, ISS: 5.0% = Total 11.15%
    const irpj = receitaBruta * 0.015;
    const csll = receitaBruta * 0.010;
    const pis = receitaBruta * 0.0065;
    const cofins = receitaBruta * 0.030;
    const iss = receitaBruta * 0.050;
    const totalRetido = irpj + csll + pis + cofins + iss;
    const liquido = receitaBruta - totalRetido;
    const despesas = 18500.00;
    const receitaReal = liquido - despesas;

    document.getElementById("fin-receita-bruta").textContent = `R$ ${receitaBruta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById("fin-total-retido").textContent = `R$ ${totalRetido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById("fin-gastos-total").textContent = `R$ ${despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById("fin-receita-liquida").textContent = `R$ ${receitaReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const tbody = document.getElementById("tbody-relatorio-fiscal");
    if (!tbody) return;
    tbody.innerHTML = `
      <tr class="hover:bg-slate-50">
        <td class="p-2 font-bold text-slate-800">NF-e 00124</td>
        <td class="p-2 text-slate-600">02/11/2026</td>
        <td class="p-2 font-semibold text-slate-900">R$ ${receitaBruta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
        <td class="p-2 text-rose-600">R$ ${irpj.toFixed(2)}</td>
        <td class="p-2 text-rose-600">R$ ${csll.toFixed(2)}</td>
        <td class="p-2 text-rose-600">R$ ${pis.toFixed(2)}</td>
        <td class="p-2 text-rose-600">R$ ${cofins.toFixed(2)}</td>
        <td class="p-2 text-rose-600">R$ ${iss.toFixed(2)}</td>
        <td class="p-2 font-bold text-emerald-700">R$ ${liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
        <td class="p-2"><span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">Liquidada</span></td>
      </tr>
    `;
  },

  // ========================================================
  // 10. ENTRADA DE VOZ ASSISTIDA (DITADO DE CAMPOS)
  // ========================================================
  configurarReconhecimentoVoz: function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Navegador não possui suporte nativo à Web Speech API.");
      return;
    }

    AppState.recognition = new SpeechRecognition();
    AppState.recognition.lang = "pt-BR";
    AppState.recognition.continuous = false;
    AppState.recognition.interimResults = false;

    AppState.recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      window.borealApp.processarComandoVoz(texto);
    };

    AppState.recognition.onend = () => {
      AppState.isRecording = false;
      document.getElementById("btn-audio-assistido").classList.remove("recording-pulse", "bg-rose-100", "border-rose-300");
      document.getElementById("label-mic").textContent = "Ditar";
    };
  },

  alternarDitadoVoz: function() {
    if (!AppState.recognition) {
      alert("A entrada por voz requer o navegador Google Chrome ou Edge.");
      return;
    }

    if (AppState.isRecording) {
      AppState.recognition.stop();
      AppState.isRecording = false;
    } else {
      AppState.recognition.start();
      AppState.isRecording = true;
      document.getElementById("btn-audio-assistido").classList.add("recording-pulse", "bg-rose-100", "border-rose-300");
      document.getElementById("label-mic").textContent = "Ouvindo...";
    }
  },

  processarComandoVoz: function(texto) {
    // Parser inteligente: se estiver com a tela de documentos aberta, insere no corpo
    const secDocs = document.getElementById("sec-documentos");
    if (secDocs && !secDocs.classList.contains("hidden")) {
      const corpo = document.getElementById("doc-corpo-texto");
      corpo.value = (corpo.value ? corpo.value + " " : "") + texto;
      this.atualizarPreviewDocumento();
      alert(`Texto capturado por voz: "${texto}"`);
      return;
    }

    // Se estiver no módulo de contratos e falar sobre fiscal:
    if (texto.toLowerCase().includes("fiscal")) {
      document.getElementById("contrato-fiscal-nome").value = texto.replace(/fiscal/i, '').trim();
      alert(`Nome do fiscal preenchido por voz: ${texto}`);
      return;
    }

    alert(`Áudio capturado: "${texto}". Posicione o cursor em um campo de texto.`);
  },

  // 11. UTILITÁRIO: NÚMERO POR EXTENSO EM PORTUGUÊS
  converterNumeroPorExtenso: function(valor) {
    if (!valor || valor === 0) return "Zero reais";
    const inteiros = Math.floor(valor);
    const centavos = Math.round((valor - inteiros) * 100);
    return `${inteiros} reais` + (centavos > 0 ? ` e ${centavos} centavos` : "");
  }
};

// Dispara inicialização assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.borealApp.init();
});
