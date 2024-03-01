import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import style from "./EfectivoTransferenciaLayout.module.css";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";
import CalendarInput from "@/components/Calendar/Calendar";
import { FaFileMedical } from "react-icons/fa";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { UploadModal } from "@/features/NuevaTransaccion/components/UploadModal/UploadModal";
import { useModal } from "@/hooks/useModal";
import { formatPrice } from "@/helpers/formatPrice";

interface Props {
	index: number;
	tipo?: string;
	subtipo?: string;
	pago?: any;
	onChange?: any;
	handleChangeResumen?: any;
	setPagos?: any;
	setFilesBlob?: any;
	eliminarPagos?: any;
	fileName?: any;
}

export const EfectivoTransferenciaLayout = ({
	index,
	tipo,
	subtipo,
	pago,
	onChange,
	handleChangeResumen,
	setPagos,
	setFilesBlob,
	eliminarPagos,
	fileName,
}: Props) => {
	const uploadFileModal = useModal();
	return (
		<>
			<div className={style.layout__container}>
				{pago.resumen ? (
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>{tipo}</p>
							{subtipo && <ChipText text={subtipo} />}
							<div style={{ display: "flex", gap: "5px" }}>
								<ChipText text={`N°: ${pago.document_number || "-"}`} />
								<ChipText text={`Monto: ${formatPrice(pago.amount || 0)}`} />
							</div>
							<div>
								<FaFileMedical style={{ color: "gray", cursor: "pointer" }} />
							</div>
						</div>
						<div className={style.layout__header__group}>
							<MaximizarButton onClick={() => handleChangeResumen(index, !pago.resumen)} />
							<DeleteButton onClick={() => eliminarPagos(index)} />
						</div>
					</div>
				) : (
					<>
						<div className={style.layout__header}>
							<div className={style.layout__header__group}>
								<p className={style.layout__header__title}>{tipo}</p>
								{subtipo && <ChipText text={subtipo} />}
								<div
									style={{ display: "flex", gap: "5px", cursor: "pointer" }}
									onClick={() => uploadFileModal.onVisibleModal()}
								>
									<FaFileMedical style={{ color: "gray", cursor: "pointer" }} />
									<p className={style.layout__header__textAdjunto}>{`${
										fileName ? `(${fileName})` : "(adjunto)"
									}`}</p>
								</div>
							</div>
							<div className={style.layout__header__group}>
								<MinimziarButton onClick={() => handleChangeResumen(index, !pago.resumen)} />
								<DeleteButton onClick={() => eliminarPagos(index)} />
							</div>
						</div>
						<div className={style.layout__content}>
							<div className={style.layout__content__group__one}>
								<TextBoxField
									name="document_number"
									value={pago.document_number}
									onChange={onChange}
									placeholder="N° de transferencia"
								/>

								<MoneyBoxField
									name="amount"
									value={pago.amount}
									onChange={onChange}
									placeholder="Monto"
								/>

								<CalendarInput name="date" value={pago.date} onChange={onChange} />
							</div>
							<div className={style.layout__content__group__two}>
								<TextBoxField
									name="observation"
									value={pago.observation}
									onChange={onChange}
									placeholder="Observaciones"
								/>
							</div>
						</div>

						{/* Upload modal */}

						<PrimeModal
							header="Carga tu archivo"
							modalStatus={uploadFileModal.modalStatus}
							onHideModal={uploadFileModal.onHideModal}
							width={400}
						>
							<UploadModal
								onChangeFileProp={onChange}
								index={index}
								setChange={setPagos}
								setFilesBlob={setFilesBlob}
								onHideModal={uploadFileModal.onHideModal}
							/>
						</PrimeModal>
					</>
				)}
			</div>
		</>
	);
};
