import React, {ChangeEvent, useState} from 'react';
import Checkbox from "@mui/material/Checkbox";
import Input from "../../../../components/input/Input";

type PropsType = {
    product: any
}

const PackInfo = ({product}: PropsType) => {
    const [weight, setWeight] = useState<boolean>(product.ВесИспользовать)
    const [indicateWeightInDoc, setIndicateWeightInDoc] = useState(product.ВесМожноУказыватьВДокументах)
    const activateWeight = (e: ChangeEvent<HTMLInputElement>) => {
        setWeight(e.currentTarget.checked)
    }
    const indicateWeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIndicateWeightInDoc(e.currentTarget.checked)
    }
    const [size, setSize] = useState<boolean>(product.ОбъемИспользовать)
    const [indicateSizeInDoc, setIndicateSizeInDoc] = useState(product.ОбъемМожноУказыватьВДокументах)
    const activateSize = (e: ChangeEvent<HTMLInputElement>) => {
        setSize(e.currentTarget.checked)
    }
    const indicateSizeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIndicateSizeInDoc(e.currentTarget.checked)
    }
    const [length, setLength] = useState<boolean>(product.ДлинаИспользовать)
    const [indicateLengthInDoc, setIndicateLengthInDoc] = useState(product.ДлинаМожноУказыватьВДокументах)
    const activateLength = (e: ChangeEvent<HTMLInputElement>) => {
        setLength(e.currentTarget.checked)
    }
    const indicateLengthHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIndicateLengthInDoc(e.currentTarget.checked)
    }
    const [area, setArea] = useState<boolean>(product.ПлощадьИспользовать)
    const [indicateAreaInDoc, setIndicateAreaInDoc] = useState(product.ПлощадьМожноУказыватьВДокументах)
    const activateArea = (e: ChangeEvent<HTMLInputElement>) => {
        setArea(e.currentTarget.checked)
    }
    const indicateAreaHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIndicateAreaInDoc(e.currentTarget.checked)
    }


    return (
        <div>
            <form className='form'>
                <div className="form__parameter">
                    <div className="form__row">
                        <div className='form__caption'>Вес</div>
                        <Checkbox sx={{padding: '5px'}}
                                  onChange={activateWeight}
                                  checked={weight}/>
                    </div>
                    <input className='hidden' type="text"
                           value={product['ВесЕдиницаИзмерения@navigationLinkUrl']}/>
                    <input className='hidden' type="text"
                           value={product.ВесЕдиницаИзмерения_Key}/>
                    {weight &&
                    <div className='form__params'>
                        <div className="form__row">
                            <Input name='Вес 1'
                                   value={product.ВесЗнаменатель}/>
                            <Input name='Вес 2' value={product.ВесЧислитель}/>
                        </div>
                        <div className="form__row">
                            <div className='form__headline'>
                                Указывать вес в документах
                            </div>
                            <Checkbox sx={{padding: '5px'}}
                                      size='small'
                                      color="success"
                                      onChange={indicateWeightHandler}
                                      checked={indicateWeightInDoc}/>
                        </div>
                    </div>
                    }
                </div>
                <div className="form__parameter">
                    <div className="form__row">
                        <div className='form__caption'>Обем</div>
                        <Checkbox sx={{padding: '5px'}}
                                  onChange={activateSize}
                                  checked={size}/>
                    </div>
                    <input className='hidden' type="text"
                           value={product['ОбъемЕдиницаИзмерения@navigationLinkUrl']}/>
                    <input className='hidden' type="text"
                           value={product.ОбъемЕдиницаИзмерения_Key}/>
                    {size &&
                    <div className='form__params'>
                        <div className='form__row'>
                            <Input name='Обем 1'
                                   value={product.ОбъемЗнаменатель}/>
                            <Input name='Обем 2'
                                   value={product.ОбъемЧислитель}/>
                        </div>
                        <div className='form__row'>
                            <div>
                                указывать объём в документах
                            </div>
                            <Checkbox sx={{padding: '5px'}}
                                      size='small'
                                      color="success"
                                      onChange={indicateSizeHandler}
                                      checked={indicateSizeInDoc}/>
                        </div>
                    </div>
                    }
                </div>
                <div className="form__parameter">
                    <div className="form__row">
                        <div className='form__caption'>Длина</div>
                        <Checkbox sx={{padding: '5px'}}
                                  onChange={activateLength}
                                  checked={length}/>
                    </div>
                    <input className='hidden' type="text"
                           value={product['ДлинаЕдиницаИзмерения@navigationLinkUrl']}/>
                    <input className='hidden' type="text"
                           value={product.ДлинаЕдиницаИзмерения_Key}/>

                    {length &&
                    <div className='form__params'>
                        <div className="form__row">
                            <Input name='Длина 1'
                                   value={product.ДлинаЗнаменатель}/>
                            <Input name='Длина 2'
                                   value={product.ДлинаЧислитель}/>
                        </div>
                        <div className="form__row">
                            <div>
                                Указывать длину в документах
                            </div>
                            <Checkbox sx={{padding: '5px'}}
                                      size='small'
                                      color="success"
                                      onChange={indicateLengthHandler}
                                      checked={indicateLengthInDoc}/>
                        </div>
                    </div>
                    }
                </div>
                <div className="form__parameter">
                    <div className="form__row">
                        <div className='form__caption'>Площадь</div>
                        <Checkbox sx={{padding: '5px'}}
                                  onChange={activateArea}
                                  checked={area}/>
                    </div>
                    <input className='hidden' type="text"
                           value={product['ПлощадьЕдиницаИзмерения@navigationLinkUrl']}/>
                    <input className='hidden' type="text"
                           value={product.ПлощадьЕдиницаИзмерения_Key}/>
                    {area &&
                    <div className='form__params'>
                        <div className="form__row">
                            <Input name='Площадь 1'
                                   value={product.ПлощадьЗнаменатель}/>
                            <Input name='Площадь 2'
                                   value={product.ПлощадьЧислитель}/>
                        </div>
                        <div className="form__row">
                            <div>
                                Указывать площадь в документах
                            </div>
                            <Checkbox sx={{padding: '5px'}}
                                      size='small'
                                      color="success"
                                      onChange={indicateAreaHandler}
                                      checked={indicateAreaInDoc}/>
                        </div>
                    </div>
                    }
                </div>
                <button style={{marginTop: '40px'}} className='button'>
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default PackInfo;