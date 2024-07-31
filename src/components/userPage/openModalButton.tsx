"use client";

interface OpenModalButtonProps {
  className: string;
  children: React.ReactNode;
  modalId: string;
}

const OpenModalButton = ({
  className,
  children,
  modalId,
}: OpenModalButtonProps) => {
  return (
    <>
      <button
        className={className}
        onClick={() => {
          const dialog = document.getElementById(modalId) as HTMLDialogElement;
          if (dialog) {
            dialog.showModal();
          }
        }}
      >
        {children}
      </button>
    </>
  );
};
export default OpenModalButton;
