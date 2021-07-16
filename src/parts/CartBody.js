import { carts } from 'constants/api/carts';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Print } from 'assets/Print.svg';
import { ReactComponent as Scan } from 'assets/Scan.svg';
import { ReactComponent as Photocopy } from 'assets/PhotoCopy.svg';
import { ReactComponent as Delete } from 'assets/delete.svg';
import { Qty } from 'components/form/qty';
import CardLoader from './CardLoader';
import { partners } from 'constants/api/partners';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { media } from 'constants/api/media';
import { toast } from 'react-toastify';

export const CartBody = () => {
    const [cart, setCart] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dataPartners, setDataPartners] = useState([]);

    useEffect(() => {
        const fetchCartsandPartners = async () => {
            try {
                const cartResponse = await carts.getByUserId();

                const dataCart = cartResponse?.data.reduce((r, a) => {
                    r[a.partner_id] = [...(r[a.partner_id] || []), a];
                    return r;
                }, {});
                const promisisFetchPartner = [];
                Object.keys(dataCart).forEach(async (partnerId) => {
                    promisisFetchPartner.push(partners.getById(partnerId));
                });
                const resPartners = await Promise.all(promisisFetchPartner);
                resPartners.forEach((dataPartner) => {
                    setDataPartners((oldDataPartners) => [
                        ...oldDataPartners,
                        dataPartner?.data,
                    ]);
                });
                setCart(dataCart);

                setIsLoading(false);
            } catch (error) {
                setCart({});

                setIsLoading(false);
            }
        };

        fetchCartsandPartners();
    }, []);

    const deleteCartHandler = (cartId) => {
        carts
            .deleteById(cartId)
            .then((res) => {
                const tempCart = { ...cart };

                // find partner id
                const partnerId = Object.keys(tempCart).find((partnerId) =>
                    tempCart[partnerId].find((item) => item.id === cartId),
                );

                // find cart index
                const cartIndex = tempCart[partnerId].findIndex(
                    (item) => item.id === cartId,
                );

                tempCart[partnerId].splice(cartIndex, 1);
                if (tempCart[partnerId].length === 0) {
                    delete tempCart[partnerId];
                }

                setCart(tempCart);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [urlFile, setUrlFile] = useState(null);
    const [listFiles, setListFiles] = useState({});
    const [numPages, setNumPages] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [isUploading, setisUploading] = useState(false);

    const onUploadProgress = (e) => {
        let progress = (100 * e.loaded) / e.total;
        setUploadProgress(progress.toFixed(2) - 5);
    };

    const fileInputHandler = async (e) => {
        setisUploading(true);
        const files = e.target.files;
        const cartId = Number(e.target.name.split('-')[1]);
        const toastId = 'fileInputHandler';

        if (files.length === 0) {
            return;
        }

        const FILE_MAX_SIZE = 10485760; // 10MB

        if (files[0].size > FILE_MAX_SIZE) {
            toast.error('File size maximum is 10 MB', {
                position: toast.POSITION.TOP_CENTER,
                toastId: toastId,
            });

            return;
        }

        const tempCart = { ...cart };
        // find partner id
        const partnerId = Object.keys(tempCart).find((partnerId) => {
            return tempCart[partnerId].find((item) => item.id === cartId);
        });

        // find cart index
        const cartIndex = tempCart[partnerId].findIndex(
            (item) => item.id === cartId,
        );

        const cartByPartnerId = [...tempCart[partnerId]];
        const cartByIndex = { ...cartByPartnerId[cartIndex] };
        const cartFiles = [
            ...cartByIndex.files,
            {
                original_filename: files[0].name,
                qty: 1,
            },
        ];

        cartByIndex.files = cartFiles;
        cartByPartnerId[cartIndex] = cartByIndex;

        setCart((oldCart) => {
            return { ...oldCart, [partnerId]: cartByPartnerId };
        });

        const fileIndex = cartByIndex.files.findIndex(
            (file) => file.original_filename === files[0].name && !file.id,
        );

        try {
            const formData = new FormData();
            formData.append('file', files[0]);

            const res = await media.upload(formData, (e) => {
                let prog = (100 * e.loaded) / e.total;
                let progress = prog.toFixed(2) - 5;
                setUploadProgress((oldUploadProgess) => {
                    return { ...oldUploadProgess, [fileIndex]: progress };
                });
            });

            const file = {
                ...cartByIndex.files[fileIndex],
                url: res.data.url,
                cart_id: cartId,
            };

            const newFile = await carts.createFile(file);

            cartByIndex.files[fileIndex] = { ...newFile.data };
            cartByPartnerId[cartIndex] = cartByIndex;

            setCart((oldCart) => {
                return { ...oldCart, [partnerId]: cartByPartnerId };
            });

            setUploadProgress((oldUploadProgess) => {
                return { ...oldUploadProgess, [fileIndex]: 100 };
            });
            setisUploading(false);
        } catch (error) {
            const cartFiles = [...cartByIndex.files];
            cartFiles.splice(fileIndex, 1);
            cartByIndex.files = cartFiles;
            cartByPartnerId[cartIndex] = cartByIndex;

            setCart((oldCart) => {
                return { ...oldCart, [partnerId]: cartByPartnerId };
            });
            console.log(error);
            setisUploading(false);
        }
    };

    const onQtyChangeHandler = (fileId, cartId, partnerId) => {
        const cartByPartnerId = cart[partnerId];
        const cartIndex = cart[partnerId].findIndex(
            (item) => item.id === cartId,
        );

        const file = fileId
            ? cartByPartnerId[cartIndex].files.find(
                  (file) => file?.id === fileId,
              )
            : undefined;
        carts
            .updateCartFile(file)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        console.log(numPages);
        setNumPages(numPages);
    };

    return (
        <div className="pt-6 pb-2 px-2">
            <div className="flex items-start justify-start flex-col w-full">
                {isLoading && <CardLoader></CardLoader>}
                {isLoading && <CardLoader></CardLoader>}
                {Object.keys(cart).length > 0 ? (
                    Object.keys(cart).map((partnerId, idx) => {
                        let partner = dataPartners.find(
                            (data) => data.id === Number(partnerId),
                        );
                        return (
                            <React.Fragment key={idx}>
                                <div>
                                    <Link to={`/partner/${partnerId}`}>
                                        <p>{partner?.name ?? ''}</p>
                                    </Link>
                                </div>
                                {cart[partnerId].map((item, index) => {
                                    return (
                                        <div key={index} className="w-full ">
                                            <div
                                                className="relative bg-white shadow py-3 px-3 my-2 w-full h-full flex justify-start items-center rounded-md"
                                                key={index}
                                            >
                                                <div>
                                                    <div>
                                                        {item?.order_type ===
                                                        'print' ? (
                                                            <Print className="w-15 h-15"></Print>
                                                        ) : item?.order_type ===
                                                          'fotocopy' ? (
                                                            <Photocopy className="w-15 h-15"></Photocopy>
                                                        ) : (
                                                            <Scan className="w-15 h-15"></Scan>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="px-5 w-full ">
                                                    <p className="text-poppins-blue-700">
                                                        {item?.order_type ?? ''}
                                                    </p>
                                                    <p className="text-poppins-orange">
                                                        Rp.{partner?.print} /
                                                        sheet
                                                    </p>
                                                </div>
                                                <div className="flex w-full justify-end items-center">
                                                    <div
                                                        onClick={() =>
                                                            deleteCartHandler(
                                                                item?.id,
                                                            )
                                                        }
                                                        className="group cursor-pointer px-1 mx-1 w-10 h-10 flex justify-center items-center shadow bg-poppins-white rounded-lg  hover:bg-poppins-orange"
                                                    >
                                                        <Delete className="w-5 h-5 fill-poppins-orange group-hover:fill-white"></Delete>
                                                    </div>
                                                    {/* <div className="px-1 mx-1">
                                                        <Qty
                                                            name={
                                                                item?.order_type
                                                            }
                                                            state={item}
                                                            setState={setCart}
                                                        ></Qty>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className="relative bg-white shadow py-1 px-3 my-2 w-full h-full flex flex-col justify-start items-center rounded-md">
                                                {item?.files?.length > 0 ? (
                                                    item?.files?.map(
                                                        (file, fileIdx) => (
                                                            <div
                                                                className="flex w-full items-center py-1.5"
                                                                key={fileIdx}
                                                            >
                                                                <div className="w-1/2">
                                                                    <p className="truncate">
                                                                        {
                                                                            file.original_filename
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="flex w-1/2 justify-end">
                                                                    {isUploading &&
                                                                    !file.id ? (
                                                                        <p>
                                                                            Uploading....{' '}
                                                                            {
                                                                                uploadProgress[
                                                                                    fileIdx
                                                                                ]
                                                                            }
                                                                            %
                                                                        </p>
                                                                    ) : (
                                                                        <>
                                                                            <div className="group cursor-pointer px-1 mx-2 w-10 h-10 flex justify-center items-center shadow bg-poppins-white rounded-lg  hover:bg-poppins-orange">
                                                                                <Delete className="w-5 h-5 fill-poppins-orange group-hover:fill-white"></Delete>
                                                                            </div>
                                                                            <Qty
                                                                                fileId={
                                                                                    file?.id
                                                                                }
                                                                                partnerId={
                                                                                    partnerId
                                                                                }
                                                                                cartId={
                                                                                    item.id
                                                                                }
                                                                                value={
                                                                                    file?.qty
                                                                                }
                                                                                name={
                                                                                    item?.order_type
                                                                                }
                                                                                state={
                                                                                    cart
                                                                                }
                                                                                setState={
                                                                                    setCart
                                                                                }
                                                                                onChangeHandler={
                                                                                    onQtyChangeHandler
                                                                                }
                                                                            ></Qty>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ),
                                                    )
                                                ) : (
                                                    <p>
                                                        there are no files to{' '}
                                                        {item?.order_type}{' '}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="py-2 px-3 flex justify-end w-full h-full">
                                                <label
                                                    className="cursor-pointer bg-poppins-orange text-white hover:bg-green-500  p-2 rounded-lg"
                                                    htmlFor={`file-${item?.id}`}
                                                >
                                                    Add File
                                                </label>
                                                <input
                                                    onChange={fileInputHandler}
                                                    className="hidden"
                                                    id={`file-${item?.id}`}
                                                    type="file"
                                                    name={`file-${item?.id}`}
                                                    accept=".pdf"
                                                ></input>
                                                <Document
                                                    className="hidden"
                                                    file={urlFile}
                                                    onLoadSuccess={
                                                        onDocumentLoadSuccess
                                                    }
                                                ></Document>
                                            </div>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })
                ) : isLoading ? (
                    ''
                ) : (
                    <div>Your Getprint Cart is Empty</div>
                )}
            </div>
        </div>
    );
};
