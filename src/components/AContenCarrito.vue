<script setup lang="ts">
import { computed, reactive } from 'vue'
import comprasData from '../data/videosCompras.json'

interface CartItem {
  id: number
  title: string
  description: string
  imageUrl: string
  price: number
  selected: boolean
  urlv: string
}

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'checkout', payload: CartItem[]): void
}>()

const state = reactive({
  items: comprasData.cartItems.map(item => ({
    ...item,
    selected: item.selected ?? true
  })) as CartItem[]
})

const selectedItems = computed(() =>
  state.items.filter(item => item.selected)
)

const subtotal = computed(() =>
  selectedItems.value.reduce((sum, item) => sum + item.price, 0)
)

const tax = computed(() => subtotal.value * 0.12)
const total = computed(() => subtotal.value + tax.value)

const toggleSelected = (item: CartItem) => {
  item.selected = !item.selected
}

const removeItem = (item: CartItem) => {
  const index = state.items.findIndex((i) => i.id === item.id)
  if (index >= 0) state.items.splice(index, 1)
}

const checkout = () => {
  if (selectedItems.value.length === 0) return
  emit('checkout', selectedItems.value)
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(value)
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="props.show" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-container">
        <header class="modal-header">
          <div>
            <h3>Carrito de Compras</h3>
            <p class="subtitle">Selecciona los cursos que quieres comprar</p>
          </div>
          <button class="close-button" @click="emit('close')">&times;</button>
        </header>

        <div class="modal-body">
          <section class="cart-details">
            <div v-if="state.items.length === 0" class="cart-empty">
              <p>No hay productos en el carrito.</p>
              <small>Elige un curso y vuelve a esta pantalla para completar tu compra.</small>
            </div>

            <div v-else class="cart-items">
              <article
                class="cart-item"
                v-for="item in state.items"
                :key="item.id"
              >
                <img :src="item.imageUrl" :alt="item.title" />

                <div class="item-meta">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                  <p class="price">{{ formatCurrency(item.price) }}</p>

                    <label class="item-select">
                        <input type="checkbox" v-model="item.selected" />
                            <span class="checkbox-custom"></span>
                            <span class="checkbox-label">Seleccionar para comprar</span>
                    </label>
                </div>

                <div class="item-actions">
                  <p class="subtotal">{{ formatCurrency(item.price) }}</p>
                  <button class="remove" @click="removeItem(item)">
                    Eliminar
                  </button>
                </div>
              </article>
            </div>
          </section>

          <aside class="order-summary">
            <h4>Resumen de la orden</h4>

            <div class="summary-line">
              <span>Cursos seleccionados</span>
              <span>{{ selectedItems.length }}</span>
            </div>
            <div class="summary-line">
              <span>Subtotal</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="summary-line">
              <span>IGV (12%)</span>
              <span>{{ formatCurrency(tax) }}</span>
            </div>
            <div class="summary-line total-line">
              <span>Total</span>
              <span>{{ formatCurrency(total) }}</span>
            </div>

            <button
              class="checkout-button"
              :disabled="selectedItems.length === 0"
              @click="checkout"
            >
              Pagar ahora
            </button>
            <button class="secondary-button" @click="emit('close')">
              Seguir comprando
            </button>
          </aside>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  z-index: 1000;
}
.modal-container {
  width: min(980px, 95vw);
  background: var(--color5);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.75rem;
  background: var(--color2);
  color: white;
}
.modal-header h3 {
  margin: 0;
}
.subtitle {
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  opacity: 0.85;
}
.close-button {
  border: none;
  background: transparent;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}
.modal-body {
  display: grid;
  grid-template-columns: 1.6fr 0.9fr;
  gap: 1rem;
  padding: 1.5rem;
}
.cart-details {
  background: var(--color4);
  border-radius: 14px;
  padding: 1rem;
}
.cart-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color1);
}
.cart-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.9rem;
  background: white;
  border-radius: 12px;
  align-items: center;
}
.cart-item img {
  width: 110px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
}
.item-meta {
  flex: 1;
}
.item-meta h4 {
  margin: 0 0 0.35rem;
}
.item-meta p {
  margin: 0.15rem 0;
  color: #555;
}
.price {
  font-weight: 700;
  margin-top: 0.5rem;
}
.item-select {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.85rem;
  cursor: pointer;
  user-select: none;
  color: #333;
  font-weight: 500;
}
.item-select input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}
.subtotal {
  font-weight: 700;
}
.remove {
  border: none;
  background: transparent;
  color: var(--color2);
  cursor: pointer;
}
.order-summary {
  background: var(--color3);
  border-radius: 14px;
  padding: 1.2rem;
  color: white;
}
.order-summary h4 {
  margin: 0 0 1rem;
}
.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.total-line {
  font-weight: 700;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  padding-top: 0.75rem;
}
.checkout-button,
.secondary-button {
  width: 100%;
  padding: 0.95rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 0.8rem;
}
.checkout-button {
  background: var(--color2);
  color: white;
}
.checkout-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.secondary-button {
  background: rgba(255, 255, 255, 0.12);
  color: white;
}
.checkbox-custom {
  width: 22px;
  height: 22px;
  border: 2px solid #3a8ef1;
  border-radius: 8px;
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;
  box-shadow: inset 0 0 0 0 rgba(58, 142, 241, 0.2);
}

.checkbox-custom::after {
  content: '';
  width: 10px;
  height: 6px;
  border: solid white;
  border-width: 0 0 3px 3px;
  transform: rotate(-45deg) scale(0);
  opacity: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.item-select input:checked + .checkbox-custom {
  background: #3a8ef1;
  border-color: #3a8ef1;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
  transform: scale(0.98);
}

.item-select input:checked + .checkbox-custom::after {
  transform: rotate(-45deg) scale(1);
  opacity: 1;
}

.checkbox-label {
  color: #1f2937;
  font-size: 0.95rem;
}

</style>