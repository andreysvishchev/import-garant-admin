import React, { ChangeEvent, useEffect, useState } from 'react';
import Input from "../../../../components/input/Input";
import Textarea from "../../../../components/textarea/Textarea";
import InputList from "../../../../components/input-list/InputList";
import { AppDispatchType, useAppSelector } from "../../../../store/store";
import { useDispatch } from "react-redux";
import CountriesModal from "../../../../components/modals/CountriesModal";
import ImportersModal from "../../../../components/modals/ImportersModal";
import MarksModal from "../../../../components/modals/MarksModal";
import ManufacturersModal from "../../../../components/modals/ManufacturersModal";
import CountryNewModal from "../../../../components/modals/CountryNewModal";
import ImporterNewModal from "../../../../components/modals/ImporterNewModal";
import MarkNewModal from "../../../../components/modals/MarkNewModal";
import ManufacturerNewModal from "../../../../components/modals/ManufacturerNewModal";
import ProductTypeModal from "../../../../components/modals/ProductTypeModal";
import {
  openCountriesModal, openManufacturersModal, openMarksModal,
  openNewCountryModal, openNewManufacturerModal, openNewMarkModal, openNoticeModal,
  openProductTypeModal
} from "../../../../store/modalsReducer";
import { useFormik } from "formik";
import { addNewProduct, changeDataProduct, updateProduct } from "../../../../store/productsReducer";
import Checkbox from '@mui/material/Checkbox';
import { PropaneSharp } from '@mui/icons-material';

type PropsType = {
  product?: any
  currentGroup: any
  currentCategory: any
}


const BaseInfo = ({ product, currentGroup, currentCategory }: PropsType) => {
  const dispatch = useDispatch<AppDispatchType>()

  const [importersModal, setImportersModal] = useState(false)
  const [importerNewModal, setImporterNewModal] = useState(false)

  const groups = useAppSelector(state => state.products.groups)
  const manufacturer = useAppSelector(state => state.additionally.manufacturer)
  const marks = useAppSelector(state => state.additionally.marks)
  const importers = useAppSelector(state => state.additionally.importers)
  const countries = useAppSelector(state => state.additionally.countries)
  const rates = useAppSelector(state => state.additionally.rates)


  const baseParam = '00000000-0000-0000-0000-000000000000';
  let manufacturerValue = '';
  let markValue = '';
  let importerValue = '';
  let groupsValue = currentGroup.Description;
  let countryValue = '';
  let ratesValue = '';


  if (product) {
    const currentManufacturer = manufacturer.find(el => el.Ref_Key === product.Производитель_Key)
    if (currentManufacturer !== undefined) {
      manufacturerValue = currentManufacturer.Description
    }
    const currentMark = marks.find(el => el.Ref_Key === product.Марка_Key)
    if (currentMark !== undefined) {
      markValue = currentMark.Description
    }
    /*  const currentGroups = groups.find(el => el.Ref_Key === product.ВидНоменклатуры_Key)
      console.log(currentGroups);

      if (currentGroups !== undefined) {
        groupsValue = currentGroups.Description
      }*/
    const currentCountry = countries.find(el => el.Ref_Key === product.СтранаПроисхождения_Key)
    if (currentCountry !== undefined) {
      countryValue = currentCountry.Description
    }
    const currentImporter = importers.find(el => el.Ref_Key === product.ПроизводительИмпортерКонтрагент_Key)
    if (currentImporter !== undefined) {
      importerValue = currentImporter.Description
    }
    const currentRate = rates.find(el => el.Ref_Key === product.СтавкаНДС_Key)
    if (currentRate !== undefined) {
      ratesValue = currentRate.Description
    }
  }


  const [manufacturerKey, setManufacturerKey] = useState(product ? product.Производитель_Key : baseParam)
  const [countryKey, setCountryKey] = useState(product ? product.СтранаПроисхождения_Key : baseParam)
  const [groupKey, setGroupKey] = useState(product ? product.ВидНоменклатуры_Key : baseParam)
  const [markKey, setMarkKey] = useState(product ? product.Марка_Key : baseParam)
  const [currentCategoryKey, setCurrentCategoryKey] = useState(currentCategory.Ref_Key)
  const [rateKey, setRateKey] = useState(product ? product.СтавкаНДС_Key : baseParam)


  const [manufacturerField, setManufacturerField] = useState(manufacturerValue)
  const [countryField, setCountryField] = useState(countryValue)
  const [markField, setMarkField] = useState(markValue)
  const [viewField, setViewField] = useState(groupsValue)
  const [importerField, setImporterField] = useState(importerValue)

  const viewFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setViewField(e.currentTarget.value)
    const currentView = groups.find(el => el.Description === e.currentTarget.value)
    if (currentView !== undefined) {
      setGroupKey(currentView.Ref_Key)
      setCurrentCategoryKey(currentView.Parent_Key)
      console.log(currentCategoryKey);
    }
  }

  const manufacturerFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setManufacturerField(e.currentTarget.value)
    const currentManufacturer = manufacturer.find(el => el.Description === e.currentTarget.value)
    if (currentManufacturer !== undefined) {
      setManufacturerKey(currentManufacturer.Ref_Key)
    }
  }
  const markFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMarkField(e.currentTarget.value)
    const currentMark = marks.find(el => el.Description === e.currentTarget.value)
    if (currentMark !== undefined) {
      setMarkKey(currentMark.Ref_Key)
    }
  }

  const countryFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryField(e.currentTarget.value)
    const currentCountry = countries.find(el => el.Description === e.currentTarget.value)
    if (currentCountry !== undefined) {
      setCountryKey(currentCountry.Ref_Key)
    }
  }

  const importerFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImporterField(e.currentTarget.value)
  }

  const changeManufacturer = (data: any) => {
    setManufacturerKey(data.Ref_Key)
    setManufacturerField(data.Description)
  }

  const changeCountry = (data: any) => {
    setCountryKey(data.Ref_Key)
    setCountryField(data.Description)
  }

  const changeMark = (data: any) => {
    setMarkKey(data.Ref_Key)
    setMarkField(data.Description)
  }

  const changeGroup = (data: any) => {
    setGroupKey(data.Ref_Key)
    setViewField(data.Description)
    setCurrentCategoryKey(data.Parent_Key)
  }

  const rateChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRateKey(e.currentTarget.value)
  }

  const formik = useFormik({
    initialValues: {
      Parent_Key: currentCategoryKey,
      // Ref_Key: product ? product.Ref_Key : v1(),
      Description: product ? product.Description : '',
      ТипНоменклатуры: product ? product.ТипНоменклатуры : '',
      НаименованиеПолное: product ? product.НаименованиеПолное : '',
      Артикул: product ? product.Артикул : '',
      Code: product ? product.Code : '',
      КодТНВЭД_Key: product ? product.КодТНВЭД_Key : '',
      Описание: product ? product.Описание : '',
      Производитель_Key: manufacturerKey,
      СтранаПроисхождения_Key: countryKey,
      ВидНоменклатуры_Key: groupKey,
      Марка_Key: markKey,
      ВесИспользовать: product ? product.ВесИспользовать : false,
      ВесМожноУказыватьВДокументах: product ? product.ВесМожноУказыватьВДокументах : false,
      ОбъемИспользовать: product ? product.ОбъемИспользовать : false,
      ОбъемМожноУказыватьВДокументах: product ? product.ОбъемМожноУказыватьВДокументах : false,
      ДлинаИспользовать: product ? product.ДлинаИспользовать : false,
      ДлинаМожноУказыватьВДокументах: product ? product.ДлинаМожноУказыватьВДокументах : false,
      ПлощадьИспользовать: product ? product.ПлощадьИспользовать : false,
      ПлощадьМожноУказыватьВДокументах: product ? product.ПлощадьМожноУказыватьВДокументах : false,
      ВесЗнаменатель: product ? product.ВесЗнаменатель : '',
      ВесЧислитель: product ? product.ВесЧислитель : '',
      ОбъемЗнаменатель: product ? product.ОбъемЗнаменатель : '',
      ОбъемЧислитель: product ? product.ОбъемЧислитель : '',
      ДлинаЗнаменатель: product ? product.ДлинаЗнаменатель : '',
      ДлинаЧислитель: product ? product.ДлинаЧислитель : '',
      ПлощадьЗнаменатель: product ? product.ПлощадьЗнаменатель : '',
      ПлощадьЧислитель: product ? product.ПлощадьЧислитель : '',
      СтавкаНДС_Key: rateKey


    },

    onSubmit: values => {
      values.Parent_Key = currentCategoryKey
      values.ВидНоменклатуры_Key = groupKey
      values.Производитель_Key = manufacturerKey
      values.СтранаПроисхождения_Key = countryKey
      values.ВидНоменклатуры_Key = groupKey
      values.Марка_Key = markKey
      values.СтавкаНДС_Key = rateKey

      if (product) {
        dispatch(updateProduct(values, product.Ref_Key))
        // console.log(values);

        // alert('Товар сохранен')
      } else {
        // dispatch(addNewProduct(values))
        alert('Товар сохранен')
      }
    },
  })


  return (
    <>
      <form className='form' onSubmit={formik.handleSubmit}>
        <Input title={'Наименование для печати '}
          name="Description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.Description} />
        <Input title={'Рабочее наименование'}
          name="НаименованиеПолное"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.НаименованиеПолное} />
        <div className="form__row">
          <div className="form__col">
            <Input title={'Артикул'}
              name="Артикул"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Артикул} />
          </div>
          <div className="form__col">
            <Input title={'Тип номенклатуры'}
              name="ТипНоменклатуры"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ТипНоменклатуры} />
          </div>
          <div className="form__col">
            <Input title={'Код'}
              placeholder={'Поле заполнится автоматически'}
              disabled={true}
              name="Code"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Code} />
          </div>
        </div>
        <div className="form__row">
          <div className="form__col">
            <div className='select'>
              <div className='select__caption'>Ставка НДС</div>
              <select className='select__field' onChange={rateChangeHandler}>
                {rates.map(el => {
                  return (
                    <option key={el.Ref_Key} id={el.Ref_Key} value={el.Ref_Key}>{el.Description}</option>
                  )
                })}
              </select>
            </div>

          </div>
          <div className="form__col">
            <Input title={'Код ТН ВЭД'}
              name="КодТНВЭД_Key"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.КодТНВЭД_Key} />
          </div>
        </div>
        <Textarea title='Описание'
          name="Описание"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.Описание}
        />
        <div className="form__row">
          <div className="form__col">
            <InputList
              value={manufacturerField}
              handler={manufacturerFieldHandler}
              data={manufacturer}
              title={'Производитель'} />
            <button
              type={'button'}
              onClick={() => dispatch(openNewManufacturerModal(true))}
              style={{
                marginTop: '6px',
                padding: '8px 15px',
                height: '40px'
              }}
              className="button">+
            </button>
            <button style={{
              marginTop: '6px',
              padding: '8px 10px',
              height: '40px'
            }}
              type='button'
              onClick={() => dispatch(openManufacturersModal(true))}
              className='button'>Показать все
            </button>
          </div>
          <div className="form__col">
            <InputList
              handler={markFieldHandler}
              value={markField}
              data={marks}
              title={'Бренд'} />
            <button
              type={'button'}
              onClick={() => dispatch(openNewMarkModal(true))}
              style={{
                marginTop: '6px',
                padding: '8px 15px',
                height: '40px'
              }}
              className="button">+
            </button>
            <button
              style={{
                marginTop: '6px',
                padding: '8px 10px',
                height: '40px'
              }}
              type='button'
              onClick={() => dispatch(openMarksModal(true))}
              className='button'>Показать все
            </button>
          </div>
        </div>
        <div className="form__row">
          <div className="form__col">
            <InputList
              value={viewField}
              data={groups}
              handler={viewFieldHandler}
              title={'Вид продукции'} />
            <button
              style={{
                marginTop: '6px',
                padding: '8px 10px',
                height: '40px'
              }}
              type='button'
              onClick={() => dispatch(openProductTypeModal(true))}
              className='button'>Показать все
            </button>
            {/* <InputList
              handler={importerFieldHandler}
              value={importerField}
              data={importers}
              title={'Импортер (Контрагент)'} />
            <button
              type={'button'}
              onClick={() => setImporterNewModal(true)}
              style={{
                marginTop: '6px',
                padding: '8px 15px',
                height: '40px'
              }}
              className="button">+
            </button>
            <button
              style={{
                marginTop: '6px',
                padding: '8px 10px',
                height: '40px'
              }}
              type='button'
              onClick={() => setImportersModal(true)}
              className='button'>Показать все
            </button> */}
          </div>
          <div className="form__col">
            <InputList
              handler={countryFieldHandler}
              value={countryField}
              data={countries}
              title={'Страна происхождения'} />
            <button
              type={'button'}
              onClick={() => dispatch(openNewCountryModal(true))}
              style={{
                marginTop: '6px',
                padding: '8px 15px',
                height: '40px'
              }}
              className="button">+
            </button>
            <button
              style={{
                marginTop: '6px',
                padding: '8px 10px',
                height: '40px'
              }}
              type='button'
              onClick={() => dispatch(openCountriesModal(true))}
              className='button'>Показать все
            </button>
          </div>
        </div>
        <div className="form__parameter">
          <div className="form__row">
            <div className='form__caption'>Вес</div>
            <Checkbox sx={{ padding: '5px' }}
              checked={formik.values.ВесИспользовать}
              {...formik.getFieldProps('ВесИспользовать')} />
          </div>
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
                  checked={formik.values.ВесМожноУказыватьВДокументах}
                  {...formik.getFieldProps('ВесМожноУказыватьВДокументах')} />
              </div>
            </div>
          }
        </div>
        <div className="form__parameter">
          <div className="form__row">
            <div className='form__caption'>Обем</div>
            <Checkbox sx={{ padding: '5px' }}
              checked={formik.values.ОбъемИспользовать}
              {...formik.getFieldProps('ОбъемИспользовать')} />
          </div>
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
                  checked={formik.values.ОбъемМожноУказыватьВДокументах}
                  {...formik.getFieldProps('ОбъемМожноУказыватьВДокументах')} />
              </div>
            </div>
          }
        </div>
        <div className="form__parameter">
          <div className="form__row">
            <div className='form__caption'>Длина</div>
            <Checkbox sx={{ padding: '5px' }}
              checked={formik.values.ДлинаИспользовать}
              {...formik.getFieldProps('ДлинаИспользовать')} />
          </div>
          {formik.values.ДлинаИспользовать &&
            <div className='form__params'>
              <div className="form__row">
                <Input title='Длина еденицы'
                  name="ДлинаЗнаменатель"
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
                  checked={formik.values.ДлинаМожноУказыватьВДокументах}
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
                  checked={formik.values.ПлощадьМожноУказыватьВДокументах}
                  size='small'
                  color="success"
                  {...formik.getFieldProps('ПлощадьМожноУказыватьВДокументах')} />
              </div>
            </div>
          }
        </div>
        <button type={'submit'} style={{ marginTop: '40px' }} className='button'>
          Сохранить
        </button>
      </form>

      <ProductTypeModal changeGroup={changeGroup} currentGroup={currentGroup} />

      <ManufacturerNewModal changeManufacturer={changeManufacturer} />
      <ManufacturersModal changeManufacturer={changeManufacturer} />

      <MarkNewModal changeMark={changeMark} />
      <MarksModal changeMark={changeMark} />

      <CountryNewModal changeCountry={changeCountry} />
      <CountriesModal changeCountry={changeCountry} />

      <ImporterNewModal open={importerNewModal} setOpen={setImporterNewModal} />
      <ImportersModal open={importersModal} setOpen={setImportersModal}
        data={importers} />
    </>

  )
}
  ;

export default BaseInfo;
