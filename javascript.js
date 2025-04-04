<!-- Indicador de Carregamento -->
  <div class="loading-overlay" id="loadingIndicator">
    <div class="loading-spinner"></div>
  </div>
   <!-- PWA Service Worker Registration -->
  <script>
    // Registrar o Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('<?= getServiceWorkerUrl() ?>')
          .then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration.scope);
          })
          .catch(function(error) {
            console.log('Falha ao registrar o Service Worker:', error);
          });
      });
    }
    
    // Verificar status de conexão
    function updateOnlineStatus() {
      if (!navigator.onLine) {
        alert('Você está offline. Algumas funcionalidades podem estar limitadas.');
      }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Adicionar evento para instalar o PWA
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevenir o comportamento padrão
      e.preventDefault();
      // Armazenar o evento para uso posterior
      deferredPrompt = e;
      
      // Criar botão de instalação
      const installButton = document.createElement('button');
      installButton.textContent = 'Instalar App';
      installButton.className = 'admin-btn';
      installButton.style.marginLeft = '10px';
      installButton.addEventListener('click', (e) => {
        // Mostrar o prompt de instalação
        deferredPrompt.prompt();
        // Esperar pela escolha do usuário
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou a instalação do A2HS');
          } else {
            console.log('Usuário recusou a instalação do A2HS');
          }
          deferredPrompt = null;
          installButton.remove();
        });
      });
      
      // Adicionar botão ao header
      const header = document.querySelector('header');
      header.appendChild(installButton);
    });
  </script>
</body>
  
  <script>
    // Configurações
    const adminPassword = "admin123"; // Senha do administrador
    
    // Variáveis globais
    let purchases = []; // Lista de compras
    let isAdminAuthenticated = false; // Estado de autenticação do administrador
    
    // Elementos DOM
    const purchaseModal = document.getElementById('purchaseModal');
    const manageModal = document.getElementById('manageModal');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const newPurchaseModal = document.getElementById('newPurchaseModal');
    const editPurchaseModal = document.getElementById('editPurchaseModal');
    
    // Inicializar a aplicação
    function initializeApp() {
      console.log('Inicializando aplicação...');
      
      // Carregar dados
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        loadDataFromSpreadsheet();
      } else {
        useSampleData();
      }
      
      // Configurar event listeners
      setupEventListeners();
      // Adicione este código após a inicialização dos modais
const editCancelBtn = document.getElementById('editCancelBtn');
if (editCancelBtn) {
  editCancelBtn.addEventListener('click', function() {
    if (editPurchaseModal) {
      editPurchaseModal.style.display = 'none';
    }
  });
}
    }
    
    // Usar dados de exemplo (quando não estiver usando Google Apps Script)
    function useSampleData() {
      console.log('Usando dados de exemplo');
      
      purchases = [
        {
          id: 1,
          productName: "iPhone 13",
          productDescription: "Smartphone Apple",
          productEmoji: "📱",
          totalValue: 5999.99,
          purchaseDate: "2023-01-15",
          storeName: "Apple Store",
          storeEmoji: "🏬",
          installments: [
            { number: 1, dueDate: "2023-02-15", value: 499.99, status: "Pago" },
            { number: 2, dueDate: "2023-03-15", value: 499.99, status: "Pago" },
            { number: 3, dueDate: "2023-04-15", value: 499.99, status: "Pago" },
            { number: 4, dueDate: "2023-05-15", value: 499.99, status: "Pendente" },
            { number: 5, dueDate: "2023-06-15", value: 499.99, status: "Pendente" },
            { number: 6, dueDate: "2023-07-15", value: 499.99, status: "Pendente" },
            { number: 7, dueDate: "2023-08-15", value: 499.99, status: "Pendente" },
            { number: 8, dueDate: "2023-09-15", value: 499.99, status: "Pendente" },
            { number: 9, dueDate: "2023-10-15", value: 499.99, status: "Pendente" },
            { number: 10, dueDate: "2023-11-15", value: 499.99, status: "Pendente" },
            { number: 11, dueDate: "2023-12-15", value: 499.99, status: "Pendente" },
            { number: 12, dueDate: "2024-01-15", value: 499.99, status: "Pendente" }
          ]
        },
        {
          id: 2,
          productName: "MacBook Pro",
          productDescription: "Notebook Apple",
          productEmoji: "💻",
          totalValue: 12999.99,
          purchaseDate: "2023-02-20",
          storeName: "Apple Store",
          storeEmoji: "🏬",
          installments: [
            { number: 1, dueDate: "2023-03-20", value: 1083.33, status: "Pago" },
            { number: 2, dueDate: "2023-04-20", value: 1083.33, status: "Pago" },
            { number: 3, dueDate: "2023-05-20", value: 1083.33, status: "Pendente" },
            { number: 4, dueDate: "2023-06-20", value: 1083.33, status: "Pendente" },
            { number: 5, dueDate: "2023-07-20", value: 1083.33, status: "Pendente" },
            { number: 6, dueDate: "2023-08-20", value: 1083.33, status: "Pendente" },
            { number: 7, dueDate: "2023-09-20", value: 1083.33, status: "Pendente" },
            { number: 8, dueDate: "2023-10-20", value: 1083.33, status: "Pendente" },
            { number: 9, dueDate: "2023-11-20", value: 1083.33, status: "Pendente" },
                        { number: 10, dueDate: "2023-12-20", value: 1083.33, status: "Pendente" },
            { number: 11, dueDate: "2024-01-20", value: 1083.33, status: "Pendente" },
            { number: 12, dueDate: "2024-02-20", value: 1083.33, status: "Pendente" }
          ]
        },
        {
          id: 3,
          productName: "Smart TV 55\"",
          productDescription: "TV Samsung 4K",
          productEmoji: "📺",
          totalValue: 3499.99,
          purchaseDate: "2023-03-10",
          storeName: "Magazine Luiza",
          storeEmoji: "🛍️",
          installments: [
            { number: 1, dueDate: "2023-04-10", value: 583.33, status: "Pago" },
            { number: 2, dueDate: "2023-05-10", value: 583.33, status: "Pendente" },
            { number: 3, dueDate: "2023-06-10", value: 583.33, status: "Pendente" },
            { number: 4, dueDate: "2023-07-10", value: 583.33, status: "Pendente" },
            { number: 5, dueDate: "2023-08-10", value: 583.33, status: "Pendente" },
            { number: 6, dueDate: "2023-09-10", value: 583.33, status: "Pendente" }
          ]
        }
      ];
      
      renderStoreList();
    }
    
    // Configurar event listeners
    function setupEventListeners() {
      console.log('Configurando event listeners...');
      
      // Botão de administrador
      const adminBtn = document.getElementById('adminBtn');
      if (adminBtn) {
        adminBtn.addEventListener('click', function() {
          if (isAdminAuthenticated) {
            // Já está autenticado, mostrar controles de administrador
            const adminControls = document.getElementById('adminControls');
            if (adminControls) {
              adminControls.style.display = adminControls.style.display === 'block' ? 'none' : 'block';
            }
            
            // Renderizar tabela de compras
            renderPurchasesTable();
          } else {
            // Mostrar modal de login
            if (adminLoginModal) {
              adminLoginModal.style.display = 'flex';
            }
          }
        });
      }
      
      // Botão de login
      const loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
        loginBtn.addEventListener('click', validateAdminLogin);
      }
      
      // Botão de adicionar compra
      const addPurchaseBtn = document.getElementById('addPurchaseBtn');
      if (addPurchaseBtn) {
        addPurchaseBtn.addEventListener('click', addNewPurchase);
      }
      
      // Botão de gerar parcelas
      const generateInstallmentsBtn = document.getElementById('generateInstallmentsBtn');
      if (generateInstallmentsBtn) {
        generateInstallmentsBtn.addEventListener('click', generateInstallments);
      }
      
      // Botão de adicionar parcela
      const addInstallmentBtn = document.getElementById('addInstallmentBtn');
      if (addInstallmentBtn) {
        addInstallmentBtn.addEventListener('click', function() {
          const installmentsContainer = document.getElementById('installmentsContainer');
          if (installmentsContainer) {
            const nextNumber = installmentsContainer.children.length + 1;
            
            // Calcular próxima data de vencimento
            let nextDueDate = '';
            
            if (installmentsContainer.children.length > 0) {
              const lastInstallmentRow = installmentsContainer.children[installmentsContainer.children.length - 1];
              const lastDateInput = lastInstallmentRow.querySelector('input[name="installment-date"]');
              
              if (lastDateInput) {
                const lastDate = new Date(lastDateInput.value);
                lastDate.setMonth(lastDate.getMonth() + 1);
                
                const year = lastDate.getFullYear();
                const month = String(lastDate.getMonth() + 1).padStart(2, '0');
                const day = String(lastDate.getDate()).padStart(2, '0');
                nextDueDate = `${year}-${month}-${day}`;
              }
            } else {
              const today = new Date();
              today.setMonth(today.getMonth() + 1);
              
              const year = today.getFullYear();
              const month = String(today.getMonth() + 1).padStart(2, '0');
              const day = String(today.getDate()).padStart(2, '0');
              nextDueDate = `${year}-${month}-${day}`;
            }
            
            // Calcular valor da parcela
            const totalValue = parseFloat(document.getElementById('editTotalValue').value) || 0;
            const installmentValue = totalValue / (nextNumber);
            
            addInstallmentRow(installmentsContainer, nextNumber, nextDueDate, installmentValue, 'Pendente');
          }
        });
      }
      
      // Formulário de edição de compra
      const purchaseForm = document.getElementById('purchaseForm');
      if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(event) {
          event.preventDefault();
          saveEditedPurchase();
        });
      }
      
      // Formulário de nova compra
      const newPurchaseForm = document.getElementById('newPurchaseForm');
      if (newPurchaseForm) {
        newPurchaseForm.addEventListener('submit', function(event) {
          event.preventDefault();
          saveNewPurchase();
        });
      }
      
      // Botões de fechar modais
      const closeButtons = document.querySelectorAll('.close-modal');
      closeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const modal = this.closest('.modal-overlay');
          if (modal) {
            modal.style.display = 'none';
          }
        });
      });
      
      // Configurar pickers de emoji
      setupEmojiPickers();
    }
    
    // Configurar pickers de emoji
    function setupEmojiPickers() {
      // Picker de emoji do produto
      const productEmojiPicker = document.getElementById('productEmojiPicker');
      if (productEmojiPicker) {
        const emojiItems = productEmojiPicker.querySelectorAll('.emoji-item');
        const productEmojiInput = document.getElementById('productEmoji');
        
        emojiItems.forEach(item => {
          item.addEventListener('click', function() {
            const emoji = this.getAttribute('data-emoji');
            
            // Atualizar input
            if (productEmojiInput) {
              productEmojiInput.value = emoji;
            }
            
            // Atualizar seleção visual
            emojiItems.forEach(i => i.classList.remove('selected-emoji'));
            this.classList.add('selected-emoji');
          });
        });
      }
      
      // Picker de emoji da loja
      const storeEmojiPicker = document.getElementById('storeEmojiPicker');
      if (storeEmojiPicker) {
        const emojiItems = storeEmojiPicker.querySelectorAll('.emoji-item');
        const storeEmojiInput = document.getElementById('storeEmoji');
        
        emojiItems.forEach(item => {
          item.addEventListener('click', function() {
            const emoji = this.getAttribute('data-emoji');
            
            // Atualizar input
            if (storeEmojiInput) {
              storeEmojiInput.value = emoji;
            }
            
            // Atualizar seleção visual
            emojiItems.forEach(i => i.classList.remove('selected-emoji'));
            this.classList.add('selected-emoji');
          });
        });
      }
      
      // Picker de emoji do produto (edição)
      const editProductEmojiPicker = document.getElementById('editProductEmojiPicker');
      if (editProductEmojiPicker) {
        const emojiItems = editProductEmojiPicker.querySelectorAll('.emoji-item');
        const editProductEmojiInput = document.getElementById('editProductEmoji');
        
        emojiItems.forEach(item => {
          item.addEventListener('click', function() {
            const emoji = this.getAttribute('data-emoji');
            
            // Atualizar input
            if (editProductEmojiInput) {
              editProductEmojiInput.value = emoji;
            }
            
            // Atualizar seleção visual
            emojiItems.forEach(i => i.classList.remove('selected-emoji'));
            this.classList.add('selected-emoji');
          });
        });
      }
      
      // Picker de emoji da loja (edição)
      const editStoreEmojiPicker = document.getElementById('editStoreEmojiPicker');
      if (editStoreEmojiPicker) {
        const emojiItems = editStoreEmojiPicker.querySelectorAll('.emoji-item');
        const editStoreEmojiInput = document.getElementById('editStoreEmoji');
        
        emojiItems.forEach(item => {
          item.addEventListener('click', function() {
            const emoji = this.getAttribute('data-emoji');
            
            // Atualizar input
            if (editStoreEmojiInput) {
              editStoreEmojiInput.value = emoji;
            }
            
            // Atualizar seleção visual
            emojiItems.forEach(i => i.classList.remove('selected-emoji'));
            this.classList.add('selected-emoji');
          });
        });
      }
    }
    
    // Renderizar lista de lojas
    function renderStoreList() {
      console.log('Renderizando lista de lojas...');
      
      const storeList = document.getElementById('storeList');
      
      if (!storeList) {
        console.error('Elemento da lista de lojas não encontrado');
        return;
      }
      
      // Limpar lista atual
      storeList.innerHTML = '';
      
      // Obter lojas únicas
      const stores = {};
      
      purchases.forEach(purchase => {
        const storeName = purchase.storeName;
        const storeEmoji = purchase.storeEmoji || '🏬';
        
        if (!stores[storeName]) {
          stores[storeName] = {
            name: storeName,
            emoji: storeEmoji,
            purchases: []
          };
        }
        
        stores[storeName].purchases.push(purchase);
      });
      
      // Renderizar cada loja
      Object.values(stores).forEach(store => {
        const storeCard = document.createElement('div');
        storeCard.className = 'store-card';
        storeCard.innerHTML = `
          <div class="store-emoji">${store.emoji}</div>
          <div class="store-name">${store.name}</div>
          <div class="store-count">${store.purchases.length} compra(s)</div>
        `;
        
        storeCard.addEventListener('click', function() {
          showPurchasesByStore(store.name);
        });
        
        storeList.appendChild(storeCard);
      });
    }
    
    // Mostrar compras por loja
    function showPurchasesByStore(storeName) {
      console.log('Mostrando compras da loja:', storeName);
      
      if (!purchaseModal) {
        console.error('Modal de compras não encontrado');
        return;
      }
      
      // Filtrar compras da loja
      const storePurchases = purchases.filter(purchase => purchase.storeName === storeName);
      
      // Atualizar título do modal
      const modalStoreName = document.getElementById('modalStoreName');
      if (modalStoreName) {
        modalStoreName.textContent = storeName;
      }
      
      // Renderizar lista de compras
      const purchaseList = document.getElementById('purchaseList');
      if (purchaseList) {
        purchaseList.innerHTML = '';
        
        storePurchases.forEach(purchase => {
          // Formatar data
          const purchaseDate = new Date(purchase.purchaseDate);
          const formattedDate = purchaseDate.toLocaleDateString('pt-BR');
          
          // Calcular status das parcelas
          const totalInstallments = purchase.installments ? purchase.installments.length : 0;
          const paidInstallments = purchase.installments ? purchase.installments.filter(i => i.status === 'Pago').length : 0;
          
          const purchaseCard = document.createElement('div');
          purchaseCard.className = 'purchase-card';
          purchaseCard.innerHTML = `
            <div class="purchase-header">
              <div class="purchase-title">
                <span class="purchase-emoji">${purchase.productEmoji || ''}</span>
                ${purchase.productName}
              </div>
              <div class="purchase-date">${formattedDate}</div>
            </div>
            
            <div class="purchase-details">
              <div class="purchase-info">
                <span class="info-label">Valor Total:</span>
                <span class="info-value">R$ ${purchase.totalValue.toFixed(2)}</span>
              </div>
              <div class="purchase-info">
                <span class="info-label">Parcelas Pagas:</span>
                <span class="info-value">${paidInstallments}/${totalInstallments}</span>
              </div>
              ${purchase.productDescription ? `
                <div class="purchase-info">
                  <span class="info-label">Descrição:</span>
                  <span class="info-value">${purchase.productDescription}</span>
                </div>
              ` : ''}
            </div>
            
            <table class="installments-table">
              <thead>
                <tr>
                  <th>Parcela</th>
                  <th>Vencimento</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${purchase.installments.map(installment => {
                  // Formatar data
                  const dueDate = new Date(installment.dueDate);
                  const formattedDueDate = dueDate.toLocaleDateString('pt-BR');
                  
                  // Determinar classe de status
                  const statusClass = installment.status === 'Pago' ? 'status-paid' : 'status-pending';
                  
                  return `
                    <tr>
                      <td>${installment.number}</td>
                      <td>${formattedDueDate}</td>
                      <td>R$ ${installment.value.toFixed(2)}</td>
                      <td class="${statusClass}">${installment.status}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `;
          
          purchaseList.appendChild(purchaseCard);
        });
      }
      
      // Exibir o modal
      purchaseModal.style.display = 'flex';
          }
    
    // Validar login de administrador
    function validateAdminLogin() {
      console.log('Validando login de administrador');
      
      const passwordInput = document.getElementById('adminPassword');
      
      if (!passwordInput) {
        console.error('Campo de senha não encontrado');
        return;
      }
      
      const enteredPassword = passwordInput.value;
      
      if (enteredPassword === adminPassword) {
        // Senha correta
        console.log('Login de administrador bem-sucedido');
        isAdminAuthenticated = true;
        
        // Fechar modal de login
        if (adminLoginModal) {
          adminLoginModal.style.display = 'none';
        }
        
        // Mostrar controles de administrador
        const adminControls = document.getElementById('adminControls');
        if (adminControls) {
          adminControls.style.display = 'block';
        }
        
        // Renderizar tabela de compras
        renderPurchasesTable();
      } else {
        // Senha incorreta
        console.log('Senha de administrador incorreta');
        alert('Senha incorreta. Por favor, tente novamente.');
      }
    }
    // Modificar a função showPurchasesByStore para ser mais responsiva
function enhanceShowPurchasesByStore() {
  // Sobrescrever a função original mantendo sua lógica
  const originalShowPurchasesByStore = window.showPurchasesByStore;
  
  window.showPurchasesByStore = function(storeName) {
    // Chamar a função original
    originalShowPurchasesByStore(storeName);
    
    // Adicionar melhorias de responsividade
    enhancePurchaseModalResponsiveness();
  };
}
    
    // Verificar se o administrador está autenticado
    function checkAdminAuth(callback) {
      if (isAdminAuthenticated) {
        // Já está autenticado, executar callback
        callback();
      } else {
        // Mostrar modal de login
        if (adminLoginModal) {
          adminLoginModal.style.display = 'flex';
          
          // Configurar um listener temporário para o botão de login
          const loginBtn = document.getElementById('loginBtn');
          if (loginBtn) {
            const originalListener = loginBtn.onclick;
            
            loginBtn.onclick = function() {
              // Validar login
              const passwordInput = document.getElementById('adminPassword');
              if (passwordInput && passwordInput.value === adminPassword) {
                // Senha correta
                isAdminAuthenticated = true;
                
                // Fechar modal de login
                if (adminLoginModal) {
                  adminLoginModal.style.display = 'none';
                }
                
                // Executar callback
                callback();
                
                // Mostrar controles de administrador
                const adminControls = document.getElementById('adminControls');
                if (adminControls) {
                  adminControls.style.display = 'block';
                }
                
                // Restaurar listener original
                loginBtn.onclick = originalListener;
              } else {
                // Senha incorreta
                alert('Senha incorreta. Por favor, tente novamente.');
              }
            };
          }
        }
      }
    }
    
    // Renderizar tabela de compras para o administrador
    function renderPurchasesTable() {
      console.log('Renderizando tabela de compras para o administrador');
      
      const purchasesTableBody = document.getElementById('purchasesTableBody');
      
      if (!purchasesTableBody) {
        console.error('Elemento da tabela de compras não encontrado');
        return;
      }
      
      // Limpar tabela atual
      purchasesTableBody.innerHTML = '';
      
      // Renderizar cada compra
      purchases.forEach(purchase => {
        // Formatar data
        const purchaseDate = new Date(purchase.purchaseDate);
        const formattedDate = purchaseDate.toLocaleDateString('pt-BR');
        
        // Calcular status das parcelas
        const totalInstallments = purchase.installments ? purchase.installments.length : 0;
        const paidInstallments = purchase.installments ? purchase.installments.filter(i => i.status === 'Pago').length : 0;
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${purchase.id}</td>
          <td>
            <span>${purchase.productEmoji || ''}</span>
            ${purchase.productName}
          </td>
          <td>
            <span>${purchase.storeEmoji || ''}</span>
            ${purchase.storeName}
          </td>
          <td>R$ ${purchase.totalValue.toFixed(2)}</td>
          <td>${formattedDate}</td>
          <td>${paidInstallments}/${totalInstallments}</td>
          <td class="action-buttons">
            <button class="btn btn-primary action-btn edit-btn" data-id="${purchase.id}">Editar</button>
            <button class="btn btn-success action-btn manage-btn" data-id="${purchase.id}">Parcelas</button>
            <button class="btn btn-danger action-btn delete-btn" data-id="${purchase.id}">Excluir</button>
          </td>
        `;
        
        purchasesTableBody.appendChild(row);
      });
      
      // Adicionar event listeners para os botões de ação
      const editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = parseInt(this.getAttribute('data-id'));
          editPurchase(id);
        });
      });
      
      const manageButtons = document.querySelectorAll('.manage-btn');
      manageButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = parseInt(this.getAttribute('data-id'));
          manageInstallments(id);
        });
      });
      
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = parseInt(this.getAttribute('data-id'));
          deletePurchase(id);
        });
      });
    }
    
    // Adicionar nova compra
    function addNewPurchase() {
      console.log('Adicionando nova compra');
      
      // Verificar autenticação
      if (!isAdminAuthenticated) {
        checkAdminAuth(addNewPurchase);
        return;
      }
      
      if (!newPurchaseModal) {
        console.error('Modal de nova compra não encontrado');
        return;
      }
      
      // Limpar formulário
      const form = document.getElementById('newPurchaseForm');
      if (form) {
        form.reset();
        
        // Definir data atual
        const dateInput = document.getElementById('purchaseDate');
        if (dateInput) {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          dateInput.value = `${year}-${month}-${day}`;
        }
      }
      
      // Exibir o modal
      newPurchaseModal.style.display = 'flex';
    }
    
    // Salvar nova compra
    function saveNewPurchase() {
      console.log('Salvando nova compra');
      
      // Obter valores do formulário
      const productName = document.getElementById('productName').value;
      const productDescription = document.getElementById('productDescription').value;
      const productEmoji = document.getElementById('productEmoji').value;
      const totalValue = parseFloat(document.getElementById('totalValue').value);
      const purchaseDate = document.getElementById('purchaseDate').value;
      const storeName = document.getElementById('storeName').value;
      const storeEmoji = document.getElementById('storeEmoji').value;
      const installmentsCount = parseInt(document.getElementById('installmentsCount').value);
      
      // Validar campos obrigatórios
      if (!productName || !totalValue || !purchaseDate || !storeName || !installmentsCount) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Gerar ID único
      const newId = purchases.length > 0 ? Math.max(...purchases.map(p => p.id)) + 1 : 1;
      
      // Gerar parcelas
      const installments = [];
      const installmentValue = totalValue / installmentsCount;
      
      for (let i = 1; i <= installmentsCount; i++) {
        // Calcular data de vencimento
        const dueDate = new Date(purchaseDate);
        dueDate.setMonth(dueDate.getMonth() + i);
        
        const year = dueDate.getFullYear();
        const month = String(dueDate.getMonth() + 1).padStart(2, '0');
        const day = String(dueDate.getDate()).padStart(2, '0');
        
        installments.push({
          number: i,
          dueDate: `${year}-${month}-${day}`,
          value: installmentValue,
          status: 'Pendente'
        });
      }
      
      // Criar objeto de compra
      const newPurchase = {
        id: newId,
        productName,
        productDescription,
        productEmoji,
        totalValue,
        purchaseDate,
        storeName,
        storeEmoji,
        installments
      };
      
      // Adicionar à lista de compras
      purchases.push(newPurchase);
      
      // Salvar dados
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        saveDataToSpreadsheet();
      }
      
      // Fechar modal
      if (newPurchaseModal) {
        newPurchaseModal.style.display = 'none';
      }
      
      // Atualizar interface
      renderStoreList();
      renderPurchasesTable();
      
      alert('Compra adicionada com sucesso!');
    }
    
    // Editar uma compra existente
    function editPurchase(purchaseId) {
      console.log('Editando compra ID:', purchaseId);
      
      // Verificar autenticação
      if (!isAdminAuthenticated) {
        checkAdminAuth(() => editPurchase(purchaseId));
        return;
      }
      
      // Encontrar a compra pelo ID
      const purchase = purchases.find(p => p.id === purchaseId);
      
      if (!purchase) {
        console.error('Compra não encontrada com ID:', purchaseId);
        alert('Compra não encontrada');
        return;
      }
      
      // Verificar se o modal de edição existe
      if (!editPurchaseModal) {
        console.error('Modal de edição não encontrado');
        alert('Erro ao abrir formulário de edição');
        return;
      }
      
      // Preencher o formulário com os dados da compra
      document.getElementById('editPurchaseId').value = purchase.id;
      document.getElementById('editProductName').value = purchase.productName;
      document.getElementById('editProductDescription').value = purchase.productDescription || '';
      document.getElementById('editProductEmoji').value = purchase.productEmoji || '🛒';
      document.getElementById('editTotalValue').value = purchase.totalValue;
      document.getElementById('editPurchaseDate').value = purchase.purchaseDate;
      document.getElementById('editStoreName').value = purchase.storeName;
      document.getElementById('editStoreEmoji').value = purchase.storeEmoji || '🏬';
      document.getElementById('editInstallmentsCount').value = purchase.installments.length;
      
      // Selecionar emoji correto
      const productEmojiItems = document.querySelectorAll('#editProductEmojiPicker .emoji-item');
      productEmojiItems.forEach(item => {
        if (item.getAttribute('data-emoji') === purchase.productEmoji) {
          item.classList.add('selected-emoji');
        } else {
          item.classList.remove('selected-emoji');
        }
      });
      
      const storeEmojiItems = document.querySelectorAll('#editStoreEmojiPicker .emoji-item');
      storeEmojiItems.forEach(item => {
        if (item.getAttribute('data-emoji') === purchase.storeEmoji) {
          item.classList.add('selected-emoji');
        } else {
          item.classList.remove('selected-emoji');
        }
      });
      
      // Preencher parcelas
      const installmentsContainer = document.getElementById('installmentsContainer');
      if (installmentsContainer) {
        installmentsContainer.innerHTML = '';
        
        purchase.installments.forEach(installment => {
          addInstallmentRow(
            installmentsContainer,
            installment.number,
            installment.dueDate,
            installment.value,
            installment.status
          );
        });
      }
      
      // Exibir o modal
      editPurchaseModal.style.display = 'flex';
    }
    
    // Adicionar linha de parcela ao container
    function addInstallmentRow(container, number, dueDate, value, status) {
      const row = document.createElement('div');
      row.className = 'installment-row';
      row.innerHTML = `
        <input type="number" name="installment-number" value="${number}" readonly style="width: 60px;">
        <input type="date" name="installment-date" value="${dueDate}" style="flex: 1;">
        <input type="number" name="installment-value" value="${value.toFixed(2)}" step="0.01" min="0" style="width: 120px;">
        <select name="installment-status" style="width: 120px;">
          <option value="Pendente" ${status === 'Pendente' ? 'selected' : ''}>Pendente</option>
          <option value="Pago" ${status === 'Pago' ? 'selected' : ''}>Pago</option>
        </select>
        <button type="button" class="remove-installment">&times;</button>
      `;
      
      // Adicionar event listener para o botão de remover
      const removeButton = row.querySelector('.remove-installment');
      if (removeButton) {
        removeButton.addEventListener('click', function() {
          container.removeChild(row);
          
          // Renumerar parcelas
          const rows = container.querySelectorAll('.installment-row');
          rows.forEach((row, index) => {
            const numberInput = row.querySelector('input[name="installment-number"]');
            if (numberInput) {
              numberInput.value = index + 1;
            }
          });
        });
      }
      
      container.appendChild(row);
    }
    
    // Gerar parcelas automaticamente
    function generateInstallments() {
      console.log('Gerando parcelas automaticamente');
      
      const installmentsCount = parseInt(document.getElementById('editInstallmentsCount').value);
      const totalValue = parseFloat(document.getElementById('editTotalValue').value);
      const purchaseDate = document.getElementById('editPurchaseDate').value;
      
      if (!installmentsCount || !totalValue || !purchaseDate) {
        alert('Por favor, preencha o número de parcelas, valor total e data da compra.');
        return;
      }
      
      const installmentsContainer = document.getElementById('installmentsContainer');
      if (installmentsContainer) {
        // Limpar parcelas existentes
        installmentsContainer.innerHTML = '';
        
        // Calcular valor da parcela
        const installmentValue = totalValue / installmentsCount;
        
                // Gerar parcelas
        for (let i = 1; i <= installmentsCount; i++) {
          // Calcular data de vencimento
          const dueDate = new Date(purchaseDate);
          dueDate.setMonth(dueDate.getMonth() + i);
          
          const year = dueDate.getFullYear();
          const month = String(dueDate.getMonth() + 1).padStart(2, '0');
          const day = String(dueDate.getDate()).padStart(2, '0');
          
          addInstallmentRow(
            installmentsContainer,
            i,
            `${year}-${month}-${day}`,
            installmentValue,
            'Pendente'
          );
        }
      }
    }
    
    // Salvar compra editada
    function saveEditedPurchase() {
      console.log('Salvando compra editada');
      
      // Obter ID da compra
      const purchaseId = parseInt(document.getElementById('editPurchaseId').value);
      
      // Encontrar índice da compra
      const purchaseIndex = purchases.findIndex(p => p.id === purchaseId);
      
      if (purchaseIndex === -1) {
        console.error('Compra não encontrada com ID:', purchaseId);
        alert('Erro ao salvar: compra não encontrada');
        return;
      }
      
      // Obter valores do formulário
      const productName = document.getElementById('editProductName').value;
      const productDescription = document.getElementById('editProductDescription').value;
      const productEmoji = document.getElementById('editProductEmoji').value;
      const totalValue = parseFloat(document.getElementById('editTotalValue').value);
      const purchaseDate = document.getElementById('editPurchaseDate').value;
      const storeName = document.getElementById('editStoreName').value;
      const storeEmoji = document.getElementById('editStoreEmoji').value;
      
      // Validar campos obrigatórios
      if (!productName || !totalValue || !purchaseDate || !storeName) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Obter parcelas
      const installmentsContainer = document.getElementById('installmentsContainer');
      const installments = [];
      
      if (installmentsContainer) {
        const rows = installmentsContainer.querySelectorAll('.installment-row');
        
        rows.forEach(row => {
          const number = parseInt(row.querySelector('input[name="installment-number"]').value);
          const dueDate = row.querySelector('input[name="installment-date"]').value;
          const value = parseFloat(row.querySelector('input[name="installment-value"]').value);
          const status = row.querySelector('select[name="installment-status"]').value;
          
          installments.push({
            number,
            dueDate,
            value,
            status
          });
        });
      }
      
      // Atualizar objeto de compra
      purchases[purchaseIndex] = {
        ...purchases[purchaseIndex],
        productName,
        productDescription,
        productEmoji,
        totalValue,
        purchaseDate,
        storeName,
        storeEmoji,
        installments
      };
      
      // Salvar dados
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        saveDataToSpreadsheet();
      }
      
      // Fechar modal
      if (editPurchaseModal) {
        editPurchaseModal.style.display = 'none';
      }
      
      // Atualizar interface
      renderStoreList();
      renderPurchasesTable();
      
      alert('Compra atualizada com sucesso!');
    }
    
    // Gerenciar parcelas de uma compra
    function manageInstallments(purchaseId) {
      console.log('Gerenciando parcelas da compra ID:', purchaseId);
      
      // Verificar autenticação
      if (!isAdminAuthenticated) {
        checkAdminAuth(() => manageInstallments(purchaseId));
        return;
      }
      
      // Encontrar a compra pelo ID
      const purchase = purchases.find(p => p.id === purchaseId);
      
      if (!purchase) {
        console.error('Compra não encontrada com ID:', purchaseId);
        alert('Compra não encontrada');
        return;
      }
      
      // Verificar se o modal existe
      if (!manageModal) {
        console.error('Modal de gerenciamento não encontrado');
        alert('Erro ao abrir gerenciador de parcelas');
        return;
      }
      
      // Atualizar título do modal
      const manageModalTitle = document.getElementById('manageModalTitle');
      if (manageModalTitle) {
        manageModalTitle.textContent = `Gerenciar Parcelas - ${purchase.productName}`;
      }
      
      // Renderizar lista de parcelas
      const installmentsList = document.getElementById('installmentsList');
      if (installmentsList) {
        installmentsList.innerHTML = `
          <div class="purchase-info">
            <span class="info-label">Produto:</span>
            <span class="info-value">${purchase.productEmoji || ''} ${purchase.productName}</span>
          </div>
          <div class="purchase-info">
            <span class="info-label">Loja:</span>
            <span class="info-value">${purchase.storeEmoji || ''} ${purchase.storeName}</span>
          </div>
          <div class="purchase-info">
            <span class="info-label">Valor Total:</span>
            <span class="info-value">R$ ${purchase.totalValue.toFixed(2)}</span>
          </div>
          <div class="purchase-info">
            <span class="info-label">Data da Compra:</span>
            <span class="info-value">${new Date(purchase.purchaseDate).toLocaleDateString('pt-BR')}</span>
          </div>
          
          <h3 style="margin-top: 20px;">Parcelas</h3>
          <table class="installments-table">
            <thead>
              <tr>
                <th>Parcela</th>
                <th>Vencimento</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${purchase.installments.map(installment => {
                // Formatar data
                const dueDate = new Date(installment.dueDate);
                const formattedDueDate = dueDate.toLocaleDateString('pt-BR');
                
                // Determinar classe de status
                const statusClass = installment.status === 'Pago' ? 'status-paid' : 'status-pending';
                
                return `
                  <tr>
                    <td>${installment.number}</td>
                    <td>${formattedDueDate}</td>
                    <td>R$ ${installment.value.toFixed(2)}</td>
                    <td class="${statusClass}">${installment.status}</td>
                    <td>
                      <button class="btn ${installment.status === 'Pago' ? 'btn-warning' : 'btn-success'} action-btn toggle-status-btn" 
                              data-purchase-id="${purchase.id}" 
                              data-installment-number="${installment.number}">
                        ${installment.status === 'Pago' ? 'Marcar como Pendente' : 'Marcar como Pago'}
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `;
        
        // Adicionar event listeners para os botões de alternar status
        const toggleButtons = installmentsList.querySelectorAll('.toggle-status-btn');
        toggleButtons.forEach(button => {
          button.addEventListener('click', function() {
            const purchaseId = parseInt(this.getAttribute('data-purchase-id'));
            const installmentNumber = parseInt(this.getAttribute('data-installment-number'));
            toggleInstallmentStatus(purchaseId, installmentNumber);
          });
        });
      }
      
      // Exibir o modal
      manageModal.style.display = 'flex';
    }
    
    // Alternar status de uma parcela
    function toggleInstallmentStatus(purchaseId, installmentNumber) {
      console.log('Alternando status da parcela:', installmentNumber, 'da compra ID:', purchaseId);
      
      // Encontrar a compra pelo ID
      const purchaseIndex = purchases.findIndex(p => p.id === purchaseId);
      
      if (purchaseIndex === -1) {
        console.error('Compra não encontrada com ID:', purchaseId);
        alert('Compra não encontrada');
        return;
      }
      
      // Encontrar a parcela pelo número
      const installmentIndex = purchases[purchaseIndex].installments.findIndex(i => i.number === installmentNumber);
      
      if (installmentIndex === -1) {
        console.error('Parcela não encontrada com número:', installmentNumber);
        alert('Parcela não encontrada');
        return;
      }
      
      // Alternar status
      const currentStatus = purchases[purchaseIndex].installments[installmentIndex].status;
      purchases[purchaseIndex].installments[installmentIndex].status = currentStatus === 'Pago' ? 'Pendente' : 'Pago';
      
      // Salvar dados
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        saveDataToSpreadsheet();
      }
      
      // Atualizar interface
      manageInstallments(purchaseId);
      renderStoreList();
      renderPurchasesTable();
    }
    
    // Excluir uma compra
    function deletePurchase(purchaseId) {
      console.log('Excluindo compra ID:', purchaseId);
      
      // Verificar autenticação
      if (!isAdminAuthenticated) {
        checkAdminAuth(() => deletePurchase(purchaseId));
        return;
      }
      
      // Confirmar exclusão
      if (!confirm('Tem certeza que deseja excluir esta compra? Esta ação não pode ser desfeita.')) {
        return;
      }
      
      // Encontrar índice da compra
      const purchaseIndex = purchases.findIndex(p => p.id === purchaseId);
      
      if (purchaseIndex === -1) {
        console.error('Compra não encontrada com ID:', purchaseId);
        alert('Compra não encontrada');
        return;
      }
      
      // Remover compra
      purchases.splice(purchaseIndex, 1);
      
      // Salvar dados
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        saveDataToSpreadsheet();
      }
      
      // Atualizar interface
      renderStoreList();
      renderPurchasesTable();
      
      alert('Compra excluída com sucesso!');
    }
    
    // Carregar dados da planilha (quando usando Google Apps Script)
    function loadDataFromSpreadsheet() {
      console.log('Carregando dados da planilha...');
      
      // Mostrar indicador de carregamento
      const loadingIndicator = document.getElementById('loadingIndicator');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
      }
      
      // Chamar função do Google Apps Script
      google.script.run
        .withSuccessHandler(function(data) {
          console.log('Dados carregados com sucesso');
          
          // Processar dados
          purchases = data;
          
          // Renderizar interface
          renderStoreList();
          
          // Ocultar indicador de carregamento
          if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
          }
        })
        .withFailureHandler(function(error) {
          console.error('Erro ao carregar dados:', error);
          
          // Ocultar indicador de carregamento
          if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
          }
          
          // Mostrar mensagem de erro
          alert('Erro ao carregar dados: ' + error);
          
          // Usar dados de exemplo
          useSampleData();
        })
        .getPurchasesData();
    }
    function gerarPix() {
    let valor = 150.75; // Defina o valor da parcela aqui
    let chavePix = "seuemail@pix.com"; // Chave PIX
    let nome = "Seu Nome";
    let cidade = "Cidade";

    // Estrutura do código PIX
    let codigoPix = `00020126330014BR.GOV.BCB.PIX0114${chavePix}5204000053039865405${valor.toFixed(2)}5802BR5913${nome}6009${cidade}62070503***6304ABCD`;

    document.getElementById("pixCode").value = codigoPix;
}

function copiarPix() {
    let pixInput = document.getElementById("pixCode");
    pixInput.select();
    document.execCommand("copy");
    alert("Código PIX copiado!");
}
    // Função para gerenciar o modo administrador
function setupAdminToggle() {
  const adminBtn = document.getElementById('adminBtn');
  const adminControls = document.getElementById('adminControls');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const loginBtn = document.getElementById('loginBtn');
  const adminPassword = document.getElementById('adminPassword');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  
  // Senha do administrador (em produção, isso deveria ser verificado no servidor)
  const ADMIN_PASSWORD = "admin123"; // Altere para uma senha segura
  
  // Estado do modo administrador
  let isAdminMode = false;
  
  // Inicialmente ocultar o painel de administrador
  adminControls.style.display = 'none';
  
  // Função para alternar o modo administrador
  function toggleAdminMode() {
    if (isAdminMode) {
      // Desativar modo administrador
      adminControls.style.display = 'none';
      adminBtn.textContent = 'Área do Administrador';
      adminBtn.classList.remove('admin-active');
      isAdminMode = false;
      
      // Salvar estado no localStorage
      localStorage.setItem('adminMode', 'false');
      
      // Mostrar notificação
      showNotification('Modo administrador desativado', 'info');
    } else {
      // Mostrar modal de login
      adminLoginModal.style.display = 'flex';
      adminPassword.focus();
      adminPassword.value = '';
    }
  }
  
  // Evento de clique no botão de administrador
  adminBtn.addEventListener('click', toggleAdminMode);
  
  // Evento de clique no botão de login
  loginBtn.addEventListener('click', function() {
    const password = adminPassword.value;
    
    if (password === ADMIN_PASSWORD) {
      // Ativar modo administrador
      adminControls.style.display = 'block';
      adminBtn.textContent = 'Sair do Modo Admin';
      adminBtn.classList.add('admin-active');
      isAdminMode = true;
      
      // Fechar modal de login
      adminLoginModal.style.display = 'none';
      
      // Salvar estado no localStorage (opcional, por segurança pode não querer persistir)
      localStorage.setItem('adminMode', 'true');
      
      // Mostrar notificação
      showNotification('Modo administrador ativado', 'success');
    } else {
      // Senha incorreta
      showNotification('Senha incorreta!', 'error');
      adminPassword.classList.add('error');
      
      // Remover classe de erro após 1 segundo
      setTimeout(() => {
        adminPassword.classList.remove('error');
      }, 1000);
    }
  });
  
  // Permitir login com Enter
  adminPassword.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      loginBtn.click();
    }
  });
  
  // Fechar modal ao clicar no botão de fechar
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal-overlay');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  // Fechar modal ao clicar fora dele
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
      event.target.style.display = 'none';
    }
  });
  
  // Verificar se o modo administrador estava ativo (opcional)
  function checkAdminMode() {
    const savedAdminMode = localStorage.getItem('adminMode');
    if (savedAdminMode === 'true') {
      // Mostrar modal de login para reautenticar
      adminLoginModal.style.display = 'flex';
      adminPassword.focus();
    }
  }
  
  // Verificar ao carregar a página
  // Descomente se quiser persistir o modo admin entre sessões
  // checkAdminMode();
  
  // Função para mostrar notificações
  function showNotification(message, type) {
    // Verificar se já existe uma função de notificação
    if (typeof window.showNotification === 'function') {
      window.showNotification(message, type);
      return;
    }
    
    // Implementação básica de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
      notification.classList.add('hide');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  }
}

// Adicionar estilos CSS para o botão de administrador
function addAdminButtonStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .admin-btn {
      background-color: #4285f4;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: bold;
    }
    
    .admin-btn:hover {
      background-color: #3367d6;
      transform: translateY(-2px);
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .admin-active {
      background-color: #db4437;
    }
    
    .admin-active:hover {
      background-color: #c53929;
    }
    
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      z-index: 9999;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease-out;
      transition: opacity 0.3s ease;
    }
    
    .notification.hide {
      opacity: 0;
    }
    
    .notification.success {
      background-color: #0f9d58;
    }
    
    .notification.error {
      background-color: #db4437;
    }
    
    .notification.info {
      background-color: #4285f4;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    input.error {
      border-color: #db4437 !important;
      animation: shake 0.5s;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
  
  document.head.appendChild(style);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  addAdminButtonStyles();
  setupAdminToggle();
});
// Função para adicionar botão PIX a cada parcela
function adicionarBotaoPix() {
  // Encontrar o container de parcelas
  const installmentsList = document.getElementById('installmentsList');
  if (!installmentsList) return;
  
  // Encontrar todos os elementos de parcelas dentro do container
  const parcelas = installmentsList.querySelectorAll('.installment-item');
  
  parcelas.forEach(parcela => {
    // Verificar se a parcela já tem um botão PIX
    if (parcela.querySelector('.mini-pix-button')) {
      return;
    }
    
    // Obter o valor da parcela
    const valorElement = parcela.querySelector('.installment-value');
    if (!valorElement) return;
    
    // Extrair o valor numérico (remover "R$" e converter para número)
    const valorTexto = valorElement.textContent;
    const valor = parseFloat(valorTexto.replace('R$', '').replace(',', '.').trim());
    
    // Criar o botão PIX compacto
    const pixButton = document.createElement('div');
    pixButton.className = 'mini-pix-button';
    pixButton.innerHTML = `
      <button class="pix-btn" onclick="gerarPixParcela(${valor}, this)">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.9 1.12L18.9 6.22C19.5 6.82 19.5 7.82 18.9 8.42L17.8 9.52L14.5 6.22L16.7 4.02L13.9 1.12ZM11.4 4.72L3.5 12.72V17.22H8L16 9.22L11.4 4.72ZM17.8 11.92L19 10.82C19.6 10.22 20.6 10.22 21.2 10.82L22.3 11.92C22.9 12.52 22.9 13.52 22.3 14.12L21.2 15.22L17.8 11.92ZM15.4 14.42L6.5 23.32H2V18.82L10.9 9.92L15.4 14.42Z"/>
        </svg>
        <span>PIX</span>
      </button>
      <div class="pix-result-mini">
        <input type="text" class="pix-code-mini" readonly>
        <button class="copy-btn" onclick="copiarPixParcela(this)">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/>
          </svg>
        </button>
        <div class="pix-success-mini">Copiado!</div>
      </div>
    `;
    
    // Adicionar o botão à parcela
    parcela.appendChild(pixButton);
  });
}

// Função para gerar o código PIX para uma parcela específica
function gerarPixParcela(valor, botao) {
  // Encontrar o container de resultado
  const pixResultContainer = botao.nextElementSibling;
  
  // Fechar outros popups abertos
  const pixResults = document.querySelectorAll('.pix-result-mini');
  pixResults.forEach(result => {
    if (result !== pixResultContainer) {
      result.style.display = 'none';
    }
  });
  
  // Alternar a visibilidade do container
  if (pixResultContainer.style.display === 'flex') {
    pixResultContainer.style.display = 'none';
    return;
  }
  
  // Mostrar o container
  pixResultContainer.style.display = 'flex';
  
  // Adicionar classe de carregamento ao botão
  botao.classList.add('loading');
  
  // Simular uma chamada de API para gerar o código PIX
  setTimeout(() => {
    // Gerar um código PIX de exemplo com o valor da parcela
    // Em um ambiente real, isso viria do seu backend
    const valorFormatado = valor.toFixed(2);
    const pixCode = `00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426655440000` +
                    `5204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***630412345802BR5915Valor: R$${valorFormatado}`;
    
    // Preencher o campo de texto
    const pixCodeInput = pixResultContainer.querySelector('.pix-code-mini');
    pixCodeInput.value = pixCode;
    
    // Remover classe de carregamento
    botao.classList.remove('loading');
    
    // Adicionar evento para fechar o popup quando clicar fora
    document.addEventListener('click', fecharPixPopup);
  }, 800);
}

// Função para copiar o código PIX da parcela
function copiarPixParcela(botao) {
  // Encontrar o input e a mensagem de sucesso
  const pixContainer = botao.closest('.pix-result-mini');
  const pixCode = pixContainer.querySelector('.pix-code-mini');
  const pixSuccess = pixContainer.querySelector('.pix-success-mini');
  
  // Selecionar o texto
  pixCode.select();
  pixCode.setSelectionRange(0, 99999); // Para dispositivos móveis
  
  // Copiar o texto
  navigator.clipboard.writeText(pixCode.value)
    .then(() => {
      // Mostrar mensagem de sucesso
      pixSuccess.style.display = 'block';
      
      // Ocultar após 2 segundos
      setTimeout(() => {
        pixSuccess.style.display = 'none';
      }, 2000);
    })
    .catch(err => {
      console.error('Erro ao copiar texto: ', err);
      
      // Fallback para método mais antigo
      document.execCommand('copy');
      
      // Mostrar mensagem de sucesso
      pixSuccess.style.display = 'block';
      
      // Ocultar após 2 segundos
      setTimeout(() => {
        pixSuccess.style.display = 'none';
      }, 2000);
    });
}

// Função para fechar o popup quando clicar fora
function fecharPixPopup(event) {
  const pixResults = document.querySelectorAll('.pix-result-mini');
  
  pixResults.forEach(pixResult => {
    // Verificar se o clique foi fora do popup
    if (pixResult.style.display === 'flex' && 
        !pixResult.contains(event.target) && 
        !event.target.classList.contains('pix-btn')) {
      pixResult.style.display = 'none';
    }
  });
}

// Adicionar estilos CSS para os botões PIX
function adicionarEstilosPixParcelas() {
  if (!document.getElementById('pixParcelasStyle')) {
    const style = document.createElement('style');
    style.id = 'pixParcelasStyle';
    style.textContent = `
      .mini-pix-button {
        display: inline-flex;
        flex-direction: column;
        margin-left: 10px;
        position: relative;
        vertical-align: middle;
      }
      
      .pix-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        background: linear-gradient(135deg, #33a8ff 0%, #1a6cd0 100%);
        color: white;
        border: none;
        border-radius: 6px;
        padding: 5px 8px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 5px rgba(26, 108, 208, 0.3);
      }
      
      .pix-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 3px 7px rgba(26, 108, 208, 0.4);
      }
      
      .pix-btn svg {
        width: 14px;
        height: 14px;
        fill: currentColor;
      }
      
      .pix-result-mini {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        width: 220px;
        background: white;
        border-radius: 6px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        padding: 8px;
        z-index: 100;
        margin-top: 5px;
        flex-direction: column;
        gap: 5px;
        animation: fadeIn 0.2s ease-out;
      }
      
      .pix-result-mini::before {
        content: '';
        position: absolute;
        top: -5px;
        right: 10px;
        width: 10px;
        height: 10px;
        background: white;
        transform: rotate(45deg);
        box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.05);
      }
      
      .pix-code-mini {
        width: 100%;
        padding: 6px 8px;
        font-size: 11px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        background-color: #f8f9fa;
        color: #333;
        font-family: monospace;
        outline: none;
      }
      
      .copy-btn {
        position: absolute;
        right: 12px;
        top: 14px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 2px;
      }
      
      .copy-btn svg {
        width: 14px;
        height: 14px;
        fill: #555;
      }
      
      .copy-btn:hover svg {
        fill: #1a6cd0;
      }
      
      .pix-success-mini {
        display: none;
        text-align: center;
        color: #0ca678;
        font-size: 11px;
        font-weight: 500;
        padding: 2px 0;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* Estilos para o estado de carregamento */
      .pix-btn.loading {
        position: relative;
        color: transparent;
      }
      
      .pix-btn.loading svg {
        opacity: 0;
      }
      
      .pix-btn.loading::after {
        content: '';
        position: absolute;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 0.8s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      /* Ajustes para layout responsivo */
      @media (max-width: 480px) {
        .pix-result-mini {
          width: 180px;
          right: -10px;
        }
        
        .pix-btn span {
          display: none;
        }
        
        .pix-btn {
          padding: 5px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Função para observar mudanças no DOM e adicionar botões PIX
function observarMudancasDOM() {
  // Observar mudanças no DOM para adicionar botões PIX a novas parcelas
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Verificar se há novas parcelas
        adicionarBotaoPix();
      }
    });
  });
  
  // Observar o container de parcelas
  const installmentsList = document.getElementById('installmentsList');
  if (installmentsList) {
    observer.observe(installmentsList, { childList: true, subtree: true });
  }
}

// Função para inicializar a funcionalidade de PIX nas parcelas
function inicializarPixParcelas() {
  // Adicionar estilos CSS
  adicionarEstilosPixParcelas();
  
  // Adicionar botões PIX às parcelas existentes
  adicionarBotaoPix();
  
  // Observar mudanças no DOM
  observarMudancasDOM();
  
  // Adicionar evento global para fechar popups ao clicar fora
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.mini-pix-button')) {
      const pixResults = document.querySelectorAll('.pix-result-mini');
      pixResults.forEach(result => {
        result.style.display = 'none';
      });
    }
  });
  
  console.log('Funcionalidade PIX para parcelas inicializada');
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarPixParcelas);

// Também inicializar quando a janela for carregada (caso o DOM já esteja pronto)
window.addEventListener('load', function() {
  // Verificar se já foi inicializado
  if (!document.getElementById('pixParcelasStyle')) {
    inicializarPixParcelas();
  }
  
  // Adicionar botões PIX após um pequeno atraso para garantir que as parcelas foram carregadas
  setTimeout(adicionarBotaoPix, 500);
});

// Adicionar função para atualizar os botões PIX quando novas parcelas forem carregadas
// Esta função pode ser chamada manualmente após carregar parcelas via AJAX
function atualizarBotoesPixParcelas() {
  adicionarBotaoPix();
}

// Expor funções globalmente
window.gerarPixParcela = gerarPixParcela;
window.copiarPixParcela = copiarPixParcela;
window.atualizarBotoesPixParcelas = atualizarBotoesPixParcelas;
    
    // Salvar dados na planilha (quando usando Google Apps Script)
    function saveDataToSpreadsheet() {
      console.log('Salvando dados na planilha...');
      
      // Mostrar indicador de carregamento
      const loadingIndicator = document.getElementById('loadingIndicator');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
      }
      
      // Chamar função do Google Apps Script
      google.script.run
        .withSuccessHandler(function() {
          console.log('Dados salvos com sucesso');
          
          // Ocultar indicador de carregamento
          if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
          }
        })
        .withFailureHandler(function(error) {
          console.error('Erro ao salvar dados:', error);
          
          // Ocultar indicador de carregamento
          if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
          }
          
          // Mostrar mensagem de erro
          alert('Erro ao salvar dados: ' + error);
        })
        .savePurchasesData(purchases);
    }
    
    // Inicializar a aplicação quando o documento estiver pronto
    document.addEventListener('DOMContentLoaded', initializeApp);
  </script>
</body>
</html>