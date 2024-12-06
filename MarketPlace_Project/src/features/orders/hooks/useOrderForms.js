import { useState } from "react";

export const useOrderForms = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const openCreateForm = () => setShowCreateForm(true);
  const closeCreateForm = () => setShowCreateForm(false);

  const openEditForm = (order) => setEditingOrder(order);
  const closeEditForm = () => setEditingOrder(null);

  return {
    showCreateForm,
    editingOrder,
    openCreateForm,
    closeCreateForm,
    openEditForm,
    closeEditForm,
  };
};
