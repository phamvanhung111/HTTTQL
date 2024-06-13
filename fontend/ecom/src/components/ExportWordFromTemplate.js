import React from 'react';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const ExportWordFromTemplate = () => {
    const loadFile = (url) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Không thể tải ${url}: ${response.statusText}`);
                }
                return response.arrayBuffer();
            });
    };

    const generateDocument = () => {
        loadFile("/template.docx").then(content => {
            let zip;
            try {
                zip = new PizZip(content);
            } catch (error) {
                console.error("Lỗi khi tạo PizZip:", error);
                return;
            }

            let doc;
            try {
                doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });
            } catch (error) {
                if (error.properties && error.properties.errors) {
                    console.error("Lỗi khởi tạo mẫu:", error.properties.errors);
                } else {
                    console.error("Lỗi khi khởi tạo Docxtemplater:", error);
                }
                return;
            }

            // Dữ liệu để thay thế các placeholder
            const data = {
                name: "Nguyễn Văn A",
                address: "123 Đường ABC, Thành phố XYZ",
                date: "01/01/2024"
            };

            try {
                doc.render(data);
            } catch (error) {
                if (error.properties && error.properties.errors) {
                    console.error("Lỗi khi render:", error.properties.errors);
                    error.properties.errors.forEach(err => {
                        console.error(err);
                    });
                } else {
                    console.error("Lỗi khi render tài liệu:", error);
                }
                return;
            }

            const out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            saveAs(out, "Báo_Cáo_Điền_Dữ_Liệu.docx");
        }).catch(error => {
            console.error("Lỗi khi tải tệp:", error);
        });
    };

    return (
        <div>
            <button onClick={generateDocument}>Xuất Báo Cáo Từ Mẫu</button>
        </div>
    );
};

export default ExportWordFromTemplate;
