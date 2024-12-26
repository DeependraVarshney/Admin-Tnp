// src/controllers/document.controller.js
import { Document } from '../models/document.model.js';
import { storageService } from '../services/storage.service.js';

export const uploadDocument = async (req, res) => {
  try {
    const upload = storageService.upload.single('file');

    upload(req, res, async (err) => {
      if (err) {
        res.status(400);
        throw err;
      }

      const {
        documentType,
        title,
        category,
        tags,
        isTemplate,
        accessControl,
      } = req.body;

      const document = await Document.create({
        documentType,
        title,
        category,
        tags: tags ? JSON.parse(tags) : [],
        isTemplate: isTemplate === 'true',
        accessControl: accessControl ? JSON.parse(accessControl) : {},
        ownerId: req.user.id,
        versions: [{
          version: '1.0',
          fileUrl: req.file.location,
          uploadedBy: req.user.id,
        }],
        currentVersion: '1.0',
      });

      res.status(201).json(document);
    });
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const updateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      res.status(404);
      throw new Error('Document not found');
    }

    // Check authorization
    if (document.ownerId.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized');
    }

    const upload = storageService.upload.single('file');

    upload(req, res, async (err) => {
      if (err) {
        res.status(400);
        throw err;
      }

      if (req.file) {
        const lastVersion = document.versions[document.versions.length - 1];
        const newVersionNumber = parseFloat(lastVersion.version) + 0.1;

        document.versions.push({
          version: newVersionNumber.toFixed(1),
          fileUrl: req.file.location,
          changes: req.body.changes,
          uploadedBy: req.user.id,
        });

        document.currentVersion = newVersionNumber.toFixed(1);
      }

      // Update other fields
      Object.assign(document, req.body);
      await document.save();

      res.json(document);
    });
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      res.status(404);
      throw new Error('Document not found');
    }

    // Check authorization
    if (document.ownerId.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized');
    }

    // Delete all versions from storage
    for (const version of document.versions) {
      await storageService.deleteFile(version.fileUrl);
    }

    await document.remove();
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};