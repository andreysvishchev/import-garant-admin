import React, { ChangeEvent, useState } from 'react';
import Checkbox from "@mui/material/Checkbox";
import Input from "../../../../components/input/Input";
import { useFormik } from "formik";
import { v1 } from "uuid";
import { changeDataProduct } from "../../../../store/productsReducer";

type PropsType = {
  product?: any
}

const PackInfo = ({ product }: PropsType) => {

  const formik = useFormik({
    initialValues: {
      ВесИспользовать: product ? product.ВесИспользовать : '',
      ВесМожноУказыватьВДокументах: product ? product.ВесМожноУказыватьВДокументах : '',
      ОбъемИспользовать: product ? product.ОбъемИспользовать : '',
      ОбъемМожноУказыватьВДокументах: product ? product.ОбъемМожноУказыватьВДокументах : '',
      ДлинаИспользовать: product ? product.ДлинаИспользовать : '',
      ДлинаМожноУказыватьВДокументах: product ? product.ДлинаМожноУказыватьВДокументах : '',
      ПлощадьИспользовать: product ? product.ПлощадьИспользовать : '',
      ПлощадьМожноУказыватьВДокументах: product ? product.ПлощадьМожноУказыватьВДокументах : '',
      ВесЗнаменатель: product ? product.ВесЗнаменатель : '',
      ВесЧислитель: product ? product.ВесЧислитель : '',
      ОбъемЗнаменатель: product ? product.ОбъемЗнаменатель : '',
      ОбъемЧислитель: product ? product.ОбъемЧислитель : '',
      ДлинаЗнаменатель: product ? product.ДлинаЗнаменатель : '',
      ДлинаЧислитель: product ? product.ДлинаЧислитель : '',
      ПлощадьЗнаменатель: product ? product.ПлощадьЗнаменатель : '',
      ПлощадьЧислитель: product ? product.ПлощадьЧислитель : ''
    },

    onSubmit: values => {

      console.log(values)
    },
  })


  return (
    <div>
      <form className='form' onSubmit={formik.handleSubmit}>
        <div className="form__parameter">
          <div className="form__row">
            <div className='form__caption'>Вес</div>
            <Checkbox sx={{ padding: '5px' }}
              {...formik.getFieldProps('ВесИспользовать')} />
          </div>
          {/*           <input className='hidden' type="text"
                           value={product['ВесЕдиницаИзмерения@navigationLinkUrl']}/>
                    <input className='hidden' type="text"
                           value={product.ВесЕдиницаИзмерения_Key}/>*/}
          {formik.values.ВесИспользовать &&
            <div className='form__params'>
              <div className="form__row">
                <Input title='Вес единицы'
                  name="ВесЗнаменатель"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ВесЗнаменатель} />
                <Input title='Вес упаковки'
                  name="ВесЧислитель"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ВесЧислитель} />
              </div>
              <div className="form__row">
                <div className='form__headline'>
                  Указывать вес в документах
                </div>
                <Checkbox sx={{ padding: '5px' }}
                  size='small'
                  color="success"
                  {...formik.getFieldProps('ВесМожноУказыватьВДокументах')} />
              </div>
            </div>
          }
        </div>
        <div className="form__parameter">
          <div className="form__row">
            <div className='form__caption'>Обем</div>
            <Checkbox sx={{ padding: '5px' }}
              {...formik.getFieldProps('ОбъемИспользовать')} />
          </div>
          {/*            <input className='hidden' type="text"
                           value={product['ОбъемЕдиницаИзмерения@navigationLinkUrl']}/>
                    <input className='hidden' type="text"
                           value={product.ОбъемЕдиницаИзмерения_Key}/>*/}
          {formik.values.ОбъемИспользовать &&
            <div className='form__params'>
              <div className='form__row'>
                <Input title='Обем еденицы'
                  name="ОбъемЗнаменатель"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ОбъемЗнаменатель} />
                <Input title='Обем упаковки'
                  name="ОбъемЧислитель"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ОбъемЧислитель} />
              </div>
              <div className='form__row'>
                <div>
                  указывать объём в документах
                </div>
                <Checkbox sx={{ padding: '5px' }}
                  size='small'
                  color="success"
                  {...formik.getFieldProps('ОбъемМожноУказыватьВДокументах')} />
              </div>
            </div>
          }
        </div>
        <div className="form__parameter">
          <div className="form__row">
            <div className='form__caption'>Длина</div>
            <Checkbox sx={{ padding: '5px' }}
              {...formik.getFieldProps('ДлинаИспользовать')} />
          </div>
          {/*                   <input className='hidden' type="text"
                           value={product['ДлинаЕдиницаИзмерения@navigationLinkUrl']}/>
                    <input className='hidden' type="text"
                           value={product.ДлинаЕдиницаИзмерения_Key}/>*/}

          {formik.values.ДлинаИспользовать &&
            <div className='form__params'>
              <div className="form__row">
                <Input title='ДлинаЗнаменатель'
                  name="ОбъемЧислитель"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ДлинаЗнаменатель} />
                <Input title='Длина упаковки'
                  name="ДлинаЧислитель"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ДлинаЧислитель} />
              </div>
              <div className="form__row">
                <div>
                  Указывать длину в документах
                </div>
                <Checkbox sx={{ padding: '5px' }}
                  size='small'
                  color="success"
                  {...formik.getFieldProps('ДлинаМожноУказыватьВДокументах')} />
              </div>
            </div>
          }
        </div>
        <div className="form__parameter">
          <div className="form__row">
            <div className='form__caption'>Площадь</div>
            <Checkbox sx={{ padding: '5px' }}
              checked={formik.values.ПлощадьИспользовать}
              {...formik.getFieldProps('ПлощадьИспользовать')} />
          </div>
          {/*  <input className='hidden' type="text"
                           value={product['ПлощадьЕдиницаИзмерения@navigationLinkUrl']}/>
                    <input className='hidden' type="text"
                           value={product.ПлощадьЕдиницаИзмерения_Key}/>*/}
          {formik.values.ПлощадьИспользовать &&
            <div className='form__params'>
              <div className="form__row">
                <Input title='Площадь еденицы'
                  name="ПлощадьЗнаменатель"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ПлощадьЗнаменатель} />
                <Input title='Площадь упаковки'
                  name="ПлощадьЧислитель"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ПлощадьЧислитель} />
              </div>
              <div className="form__row">
                <div>
                  Указывать площадь в документах
                </div>
                <Checkbox sx={{ padding: '5px' }}
                  size='small'
                  color="success"
                  {...formik.getFieldProps('ПлощадьМожноУказыватьВДокументах')} />
              </div>
            </div>
          }
        </div>
        <button style={{ marginTop: '40px' }} type='submit' className='button'>
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default PackInfo;
