import React, { useState } from 'react';
import styles from './DishForm.module.css';

interface DishFormProps {
  lang: 'en' | 'fr';
}

export default function DishForm({ lang }: DishFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const allergens = ['Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Fish', 'Shellfish'];
  const dietary = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal'];
  const categories = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks'];

  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{lang === 'en' ? 'Basic Details' : 'Détails de base'}</h2>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Dish Name (EN)' : 'Nom du plat (EN)'}</label>
            <input type="text" className={styles.input} placeholder="e.g. Beef Bourguignon" />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Dish Name (FR)' : 'Nom du plat (FR)'}</label>
            <input type="text" className={styles.input} placeholder="ex. Bœuf Bourguignon" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Description (EN)' : 'Description (EN)'}</label>
            <textarea className={styles.textarea} rows={3} placeholder="Describe the dish..."></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Description (FR)' : 'Description (FR)'}</label>
            <textarea className={styles.textarea} rows={3} placeholder="Décrivez le plat..."></textarea>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang === 'en' ? 'Price (€)' : 'Prix (€)'}</label>
              <div className={styles.priceInputWrapper}>
                <span className={styles.currencySymbol}>€</span>
                <input type="number" step="0.01" className={`${styles.input} ${styles.priceInput}`} placeholder="0.00" />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang === 'en' ? 'Category' : 'Catégorie'}</label>
              <select className={styles.select}>
                <option value="">{lang === 'en' ? 'Select a category' : 'Sélectionnez une catégorie'}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{lang === 'en' ? 'Image' : 'Image'}</h2>
          <div 
            className={`${styles.dropzone} ${dragActive ? styles.dragActive : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className={styles.imagePreviewContainer}>
                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                <button type="button" className={styles.removeImageBtn} onClick={() => setImagePreview(null)}>
                  {lang === 'en' ? 'Remove Image' : 'Supprimer l\'image'}
                </button>
              </div>
            ) : (
              <div className={styles.dropzoneContent}>
                <span className={styles.uploadIcon}>📸</span>
                <p>{lang === 'en' ? 'Drag & drop an image here, or click to select' : 'Glissez et déposez une image ici, ou cliquez pour sélectionner'}</p>
                <input type="file" className={styles.fileInput} accept="image/*" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) setImagePreview(event.target.result as string);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{lang === 'en' ? 'Dietary & Allergens' : 'Régime et Allergènes'}</h2>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Dietary Options' : 'Options Diététiques'}</label>
            <div className={styles.tagsContainer}>
              {dietary.map(diet => (
                <button
                  type="button"
                  key={diet}
                  className={`${styles.tag} ${selectedDietary.includes(diet) ? styles.tagActive : ''}`}
                  onClick={() => toggleSelection(diet, selectedDietary, setSelectedDietary)}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Allergens' : 'Allergènes'}</label>
            <div className={styles.tagsContainer}>
              {allergens.map(allergen => (
                <button
                  type="button"
                  key={allergen}
                  className={`${styles.tag} ${selectedAllergens.includes(allergen) ? styles.tagActive : ''}`}
                  onClick={() => toggleSelection(allergen, selectedAllergens, setSelectedAllergens)}
                >
                  {allergen}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn}>
            {lang === 'en' ? 'Cancel' : 'Annuler'}
          </button>
          <button type="submit" className={styles.submitBtn}>
            {lang === 'en' ? 'Save Dish' : 'Enregistrer le plat'}
          </button>
        </div>
      </form>

      <div className={styles.previewPanel}>
        <h2 className={styles.sectionTitle}>{lang === 'en' ? 'Live Preview' : 'Aperçu en direct'}</h2>
        <div className={styles.previewCard}>
          <div className={styles.previewImageContainer}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className={styles.previewImage} />
            ) : (
              <div className={styles.previewImagePlaceholder}>
                <span>{lang === 'en' ? 'No image' : 'Pas d\'image'}</span>
              </div>
            )}
          </div>
          <div className={styles.previewContent}>
            <h3 className={styles.previewName}>{lang === 'en' ? 'Dish Name' : 'Nom du plat'}</h3>
            <span className={styles.previewPrice}>€0.00</span>
            <p className={styles.previewDesc}>
              {lang === 'en' ? 'Dish description will appear here...' : 'La description du plat apparaîtra ici...'}
            </p>
            <div className={styles.previewBadges}>
              {selectedDietary.map(d => <span key={d} className={styles.previewBadge}>{d}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
