"use client";
import React from "react";

type ConfirmationModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal = ({
  open,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-black">
        <h2 className="text-xl font-bold mb-4">Confirm Removal</h2>
        <p>Are you sure you want to remove this movie from your favourites?</p>
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
